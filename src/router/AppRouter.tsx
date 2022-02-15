import { useContext, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import { AuthContext } from "../context/auth/authContext";
import { AuthRouter } from "./AuthRouter";
import { DashBoardRoutes } from "./DashBoardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";


export const AppRouter = () => {

  const { loading } = useContext(AuthContext);
  

  useEffect(() => {
    loading()
  }, [loading]);
  
    

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/auth/*" element={ 
              <PublicRoute>
                <AuthRouter />
              </PublicRoute>
              } 
            />

            <Route path="/*" element={ 
              <PrivateRoute>
                <DashBoardRoutes />
              </PrivateRoute>
            } 
            
            />
        </Routes>
        
    </BrowserRouter>

  );
};
