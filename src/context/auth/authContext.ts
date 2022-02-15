import { createContext } from "react";
import { UserLogin } from "./AuthProvider";
import { AuthAction, UserProps } from "./authReducer";

interface AuthContextProps {
    logged?: boolean,
    user?: UserProps,


    authDispatch: React.Dispatch<AuthAction>
    loading: () => void
    doLogin: (data: UserLogin) => void
    logout: () => void
}


export const AuthContext = createContext( {} as AuthContextProps );