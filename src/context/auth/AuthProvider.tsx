import { useCallback, useReducer } from "react";
import { fetchWithToken, fetchWithoutToken } from "../../helpers/fetch";
import { Renew } from "../../interfaces/auth";
import { Props } from "../../interfaces/props";
import { AuthContext } from "./authContext";
import { authReducer, AuthState } from "./authReducer";
import Swal from 'sweetalert2';


const InitialState: AuthState = {
    logged: false,

}

export interface UserLogin {
    email:string;
    password:string
}
export interface NewUser {
    name:string;
    surname:string;
    email:string;
    password:string
}



export const AuthProvider = ({ children }:Props) => {

    const [ authState, authDispatch] = useReducer( authReducer, InitialState);

    const loading = useCallback( async(): Promise<Renew> => {
        const resp = await fetchWithToken('auth/renew', '', 'GET')
        const body = await resp.json();
        if( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );
            const { uid, name } = body;
            authDispatch({ type: 'login', payload: {uid, name} });
        }
        
        return body;

    }, []);


    const doLogin = async( data:UserLogin ) => {
    
        const resp = await fetchWithoutToken('auth/login', data, 'POST')
        const body = await resp.json();
    
        if(body.ok){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );
            
            const { uid, name } = body;
            authDispatch({ type: 'login', payload: {uid, name} });
         
    
        } else {
            Swal.fire('Authentication Error', body.msg, 'error')
        }
    }

    const doRegister = async( data:UserLogin ) => {
    
        const resp = await fetchWithoutToken('auth/register', data, 'POST')
        const body = await resp.json();
    
        if(body.ok){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime().toString() );
            
            const { uid, name } = body;
            authDispatch({ type: 'login', payload: {uid, name} });
         
    
        } else {
            Swal.fire('Authentication Error', body.msg, 'error')
        }
    }


    const logout = () => {

        authDispatch({ type: 'logout'});
        localStorage.clear();
    }
    
    
    return (
        <AuthContext.Provider value={{
            ...authState,

            authDispatch,
            loading,
            doLogin,
            doRegister,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    );
};
