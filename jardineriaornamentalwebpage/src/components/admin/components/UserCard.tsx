import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  rol: "admin" | "empleado";
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="bg-card hover:bg-accent transition-colors p-4 rounded-xl shadow cursor-pointer border">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.nombre} />
              <AvatarFallback className="text-lg">
                {user.nombre?.charAt(0)?.toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">
                {user.nombre} {user.apellido}
              </p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm">
        Registrado el{" "}
        <span className="font-medium">
          {new Date(user.createdAt!).toLocaleDateString()}
        </span>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserCard;
