import React from 'react';
import {Link} from 'wouter';
import {useSession} from '../auth/SessionProvider';
import {useUserRoles} from '../hooks/useRoles';
import {roleLabel} from '../config/auth';
export default function LoginPage(){
 const {isLoading,isAuthenticated,loginWithRedirect,logout,error,configured,user}=useSession();
 const roles=useUserRoles();
 return <div className="contenedor"><div className="form-panel"><h1>Acceso a SyncPass</h1>
 <p className="subtitulo">Inicia sesión o crea tu cuenta mediante Amazon Cognito.</p>
 {error && <p className="alert alert-warning" role="alert">{error.message}</p>}
 {!configured && <p className="alert alert-warning">El acceso aún requiere configurar el grupo de usuarios de Cognito.</p>}
 {isLoading?<p>Verificando sesión…</p>:isAuthenticated?<><p role="status">Sesión iniciada correctamente con Amazon Cognito.</p><p>Correo: <strong>{user?.email || 'No disponible'}</strong></p><p>Perfil: {roles.map(roleLabel).join(' · ') || 'Pendiente de asignación'}</p><Link href="/mi-panel" className="btn btn-primary">Ir a mi panel</Link><button className="btn btn-secondary" onClick={logout}>Cerrar sesión</button></>:<button className="btn btn-primary btn-block" disabled={!configured} onClick={loginWithRedirect}>Continuar con Cognito</button>}
 </div></div>;
}
