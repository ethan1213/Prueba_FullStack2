import React from 'react';
import {Link} from 'wouter';
import {useSession} from '../auth/SessionProvider';
import {useUserRoles} from '../hooks/useRoles';
import {roleLabel} from '../config/auth';
export default function RegisterPage(){
 const {isLoading,isAuthenticated,signupWithRedirect,logout,error,configured,user}=useSession();
 const roles=useUserRoles();
 return <div className="contenedor"><div className="form-panel"><h1>Crear cuenta en SyncPass</h1>
 <p className="subtitulo">El registro se realiza en Amazon Cognito. SyncPass nunca recibe tu contraseña.</p>
 {error && <p className="alert alert-warning" role="alert">{error.message}</p>}
 {!configured && <p className="alert alert-warning">El registro aún requiere configurar el grupo de usuarios de Cognito.</p>}
 {isLoading?<p>Verificando sesión…</p>:isAuthenticated?<><p role="status">Ya tienes la sesión iniciada con Amazon Cognito.</p><p>Correo: <strong>{user?.email || 'No disponible'}</strong></p><p>Perfil: {roles.map(roleLabel).join(' · ') || 'Pendiente de asignación'}</p><Link href="/mi-panel" className="btn btn-primary">Ir a mi panel</Link><button className="btn btn-secondary" onClick={logout}>Cerrar sesión</button></>:<>
 <ol className="lista-pasos">
  <li>Completa el formulario de Cognito con tu usuario, correo y contraseña.</li>
  <li>Cognito envía un código a ese correo; confírmalo para activar la cuenta.</li>
  <li>Vuelves a SyncPass con la sesión iniciada. El administrador asigna tu perfil (grupo) en Cognito.</li>
 </ol>
 <button className="btn btn-primary btn-block" disabled={!configured} onClick={signupWithRedirect}>Registrarme con Cognito</button>
 <p className="subtitulo">¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>.</p></>}
 </div></div>;
}
