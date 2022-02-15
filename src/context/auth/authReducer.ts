
export interface UserProps {
    uid: string;
    name: string
}

export interface AuthState {
    logged: boolean;
    user?: UserProps
}

export type AuthAction = 
| { type: 'login', payload: UserProps }
| { type: 'logout' }



export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

    switch (action.type) {
        case 'login':
            return {
               logged: true,
               user: action.payload 
            }
        case 'logout':
            return {
                ...state,
                logged: false,
                user: undefined
            }
    
        default:
            return state;
    }

}