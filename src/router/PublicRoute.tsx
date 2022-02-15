import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";
import { Props } from "../interfaces/props";



export const PublicRoute = ({ children }:Props ) => {

    const { logged } = useContext( AuthContext );
    
    if( logged ){
        return <Navigate to="/" />
    } else {
        return <>{ children }</>
    }
 

};
