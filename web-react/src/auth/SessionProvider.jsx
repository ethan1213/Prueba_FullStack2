import React,{createContext,useContext,useState} from 'react';
import {AuthProvider,useAuth} from 'react-oidc-context';
import {WebStorageStateStore} from 'oidc-client-ts';
import {COGNITO_ISSUER,COGNITO_CLIENT_ID,COGNITO_DOMAIN} from '../config/auth';
const configured=Boolean(COGNITO_ISSUER && COGNITO_CLIENT_ID && COGNITO_DOMAIN);
const Context=createContext(null);
const settings={authority:COGNITO_ISSUER,client_id:COGNITO_CLIENT_ID,
 redirect_uri:window.location.origin+'/auth/callback',response_type:'code',scope:'openid email',
 automaticSilentRenew:true,userStore:new WebStorageStateStore({store:window.sessionStorage}),
 onSigninCallback:()=>{window.history.replaceState({},'', '/login');window.dispatchEvent(new PopStateEvent('popstate'));}};
function SessionBridge({children}){
 const auth=useAuth();const [actionError,setActionError]=useState(null);
 async function loginWithRedirect(){try{await auth.signinRedirect();}catch(e){setActionError(e);}}
 async function logout(){await auth.removeUser();window.location.assign(COGNITO_DOMAIN+'/logout?'+new URLSearchParams({client_id:COGNITO_CLIENT_ID,logout_uri:window.location.origin+'/'}));}
 async function getAccessTokenSilently(){
  let current=auth.user;
  if(current?.expired)current=await auth.signinSilent();
  if(!current || current.expired)throw new Error('Inicia sesión para continuar.');
  return current.access_token;
 }
 return <Context.Provider value={{configured:true,isLoading:auth.isLoading,error:actionError||auth.error,user:auth.user?.profile,isAuthenticated:auth.isAuthenticated,loginWithRedirect,logout,getAccessTokenSilently}}>{children}</Context.Provider>;
}
export function SessionProvider({children}){
 if(!configured)return <Context.Provider value={{configured:false,isLoading:false,isAuthenticated:false,user:null,error:null,loginWithRedirect:()=>window.location.assign('/login'),logout:()=>{},getAccessTokenSilently:async()=>{throw new Error('Configura Cognito para continuar.');}}}>{children}</Context.Provider>;
 return <AuthProvider {...settings}><SessionBridge>{children}</SessionBridge></AuthProvider>;
}
export const useSession=()=>useContext(Context);
