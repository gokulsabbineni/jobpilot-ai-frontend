import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  import type { AuthUser } from "../types/auth";
  
  import {
    clearSession,
    getStoredUser,
    login as loginApi,
    saveSession,
  } from "../api/auth";
  
  interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (
      email: string,
      password: string
    ) => Promise<AuthUser>;
    logout: () => void;
  }
  
  const AuthContext =
    createContext<AuthContextValue | undefined>(
      undefined
    );
  
  export function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [user, setUser] =
      useState<AuthUser | null>(null);
  
    const [isLoading, setIsLoading] =
      useState(true);
  
    useEffect(() => {
      const storedUser =
        getStoredUser();
  
      setUser(storedUser);
      setIsLoading(false);
    }, []);
  
    async function login(
      email: string,
      password: string
    ) {
      const response =
        await loginApi(
          email,
          password
        );
  
      saveSession(response);
  
      setUser(response.user);
  
      return response.user;
    }
  
    function logout() {
      clearSession();
      setUser(null);
    }
  
    return (
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated: !!user,
          isLoading,
          login,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context =
      useContext(AuthContext);
  
    if (!context) {
      throw new Error(
        "useAuth must be used inside AuthProvider"
      );
    }
  
    return context;
  }