import {
    Navigate,
    Outlet,
  } from "react-router-dom";
  
  import { useAuth } from "./AuthContext";
  
  interface RoleRouteProps {
    allowedRole: "USER" | "ADMIN";
  }
  
  export default function RoleRoute({
    allowedRole,
  }: RoleRouteProps) {
    const { user } = useAuth();
  
    if (!user) {
      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }
  
    if (user.role !== allowedRole) {
      if (user.role === "ADMIN") {
        return (
          <Navigate
            to="/admin"
            replace
          />
        );
      }
  
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }
  
    if (
      allowedRole === "USER" &&
      user.status !== "ACTIVE"
    ) {
      return (
        <Navigate
          to="/account-pending"
          replace
        />
      );
    }
  
    return <Outlet />;
  }