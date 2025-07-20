import React, { createContext, useContext, useState, useEffect } from "react";
interface User {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  role: "admin" | "empleado";
  apellido: string;
  telefono: string;
  direccion?: string;
  activo: boolean;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateProfile: (updates: {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    direccion?: string;
    avatar?: string;
  }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Token inválido");

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error verificando token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("jardineria_user");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("jardineria_user", JSON.stringify(user));
      setUser(user);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const updateProfile = async (updates: {
    nombre?: string;
    apellido?: string;
    telefono?: string;
    direccion?: string;
    avatar?: string;
  }) => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    try {
      const response = await fetch("http://localhost:4000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Error al actualizar el perfil");

      const data = await response.json();
      setUser(data.user); // actualiza el contexto
      localStorage.setItem("jardineria_user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Error actualizando perfil:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("jardineria_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
