import {
    Navigate,
    Outlet,
  } from "react-router-dom";
  
  import { useAuth } from "./AuthContext";
  
  export default function ProtectedRoute() {
    const {
      isAuthenticated,
      isLoading,
    } = useAuth();
  
    if (isLoading) {
      return (
        <div className="route-loading">
          Loading...
        </div>
      );
    }
  
    if (!isAuthenticated) {
      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }
  
    return <Outlet />;
  }