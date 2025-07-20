"use client";

import { ChevronsUpDown, LogOut, Moon, Sun, User, Lock } from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./admin/components/ConfirmDialog";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    apellido: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-9 w-9 rounded-md">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-md">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center ml-3 text-left truncate">
                <span className="font-medium leading-tight text-sm truncate">
                  {user.name} {user.apellido}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-9 w-9 rounded-md">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-md">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center text-sm leading-tight">
                  <span className="font-medium truncate">
                    {user.name} {user.apellido}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => navigate("/admin/dashboard/perfil")}
              >
                <User className="w-4 h-4 mr-2" />
                Mi perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Lock className="w-4 h-4 mr-2" />
                Cambiar contraseña
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Tema claro
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Tema oscuro
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <ConfirmDialog
                onConfirm={handleLogout}
                title="¿Cerrar sesión?"
                description="Tu sesión actual se cerrará y tendrás que volver a iniciar sesión."
                confirmText="Cerrar sesión"
                cancelText="Cancelar"
                confirmClassName="bg-destructive text-white hover:bg-destructive/90"
                trigger={
                  <div className="flex items-center gap-2 w-full cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </div>
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
