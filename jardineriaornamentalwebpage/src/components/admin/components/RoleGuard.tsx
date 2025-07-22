import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface RoleGuardProps {
  allow: ("admin" | "empleado")[];
  children: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allow, children }) => {
  const { user } = useAuth();

  if (!user || !allow.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
