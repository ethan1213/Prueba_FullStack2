const env=import.meta.env;
export const COGNITO_ISSUER=env.VITE_COGNITO_ISSUER || '';
export const COGNITO_CLIENT_ID=env.VITE_COGNITO_CLIENT_ID || '';
export const COGNITO_DOMAIN=env.VITE_COGNITO_DOMAIN || '';
export const API_URL=(env.VITE_API_URL || '').replace(/\/$/,'');
export const ROLES_CLAIM='cognito:groups';
export const ROLES={admin:'admin',coordinator:'coordinador',volunteer:'monitor',attendee:'participante'};
export const ROLE_LABELS={admin:'Administrador',coordinador:'Docente / Coordinador(a)',monitor:'Estudiante voluntario / Monitor',participante:'Beneficiario comunitario / Asistente'};
export const roleLabel=role=>ROLE_LABELS[role] || role;
