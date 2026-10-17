#!/bin/bash
set -euo pipefail
exec > >(tee -a /var/log/syncpass-bootstrap.log) 2>&1

dnf install -y docker git
systemctl enable --now docker
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

mkdir -p /opt/syncpass
git clone --depth 1 --branch syncpass-api-ec2 https://github.com/ethan1213/Prueba_FullStack2.git /opt/syncpass/source
test "$(git -C /opt/syncpass/source rev-parse HEAD)" = "8b85b6738fd130f8f080687271f07dfebc0245fc"
cp -a /opt/syncpass/source/backend /opt/syncpass/backend

TOKEN=$(curl -fsS -X PUT -H 'X-aws-ec2-metadata-token-ttl-seconds: 21600' http://169.254.169.254/latest/api/token)
PUBLIC_IP=$(curl -fsS -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-ipv4)
API_DOMAIN="api.${PUBLIC_IP//./-}.nip.io"
DB_PASSWORD=$(openssl rand -hex 24)
cat > /opt/syncpass/runtime.env <<EOF
POSTGRES_DB=syncpass
POSTGRES_USER=syncpass
POSTGRES_PASSWORD=$DB_PASSWORD
DATABASE_URL=jdbc:postgresql://db:5432/syncpass
DATABASE_USER=syncpass
DATABASE_PASSWORD=$DB_PASSWORD
COGNITO_ISSUER=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_2C9bbmKGd
COGNITO_CLIENT_ID=677bhbj1qg892bmlk2pr1h6had
CORS_ORIGINS=http://localhost:3000
EOF
chmod 600 /opt/syncpass/runtime.env
cat > /opt/syncpass/Caddyfile <<'EOF'
{$API_DOMAIN} {
  encode gzip
  @api path /api/* /actuator/health
  handle @api {
    reverse_proxy api:8080
  }
  handle {
    respond "Not found" 404
  }
  header X-Content-Type-Options nosniff
}
EOF

docker network create syncpass
docker volume create syncpass-db
docker volume create syncpass-caddy
docker run -d --name syncpass-db --network syncpass --network-alias db --restart unless-stopped --memory 256m -v syncpass-db:/var/lib/postgresql/data --env-file /opt/syncpass/runtime.env postgres:17-alpine
docker build -t syncpass-api:local /opt/syncpass/backend
docker run -d --name syncpass-api --network syncpass --network-alias api --restart unless-stopped --memory 700m --env-file /opt/syncpass/runtime.env syncpass-api:local
docker run -d --name syncpass-caddy --network syncpass --restart unless-stopped --memory 96m -p 80:80 -p 443:443 -v /opt/syncpass/Caddyfile:/etc/caddy/Caddyfile:ro -v syncpass-caddy:/data -e API_DOMAIN="$API_DOMAIN" caddy:2-alpine
echo "SYNC_PASS_API=https://$API_DOMAIN" | tee /opt/syncpass/api-url.txt
