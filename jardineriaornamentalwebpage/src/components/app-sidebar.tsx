"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Calendar,
  Frame,
  GalleryVerticalEnd,
  // Map,
  // PieChart,
  Car,
  BookUser,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const data = {
  teams: [
    {
      name: "Jardineria Ornamental",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Inicio",
      url: "/admin/dashboard",
      icon: Frame,
    },
    {
      title: "Citas",
      url: "/admin/dashboard/appointments",
      icon: Calendar,
    },
    {
      title: "Servicios",
      url: "/admin/dashboard/service",
      icon: Bot,
    },
    {
      title: "Contenido",
      url: "/admin/dashboard/content",
      icon: BookOpen,
    },
    {
      title: "Estado del Carrito",
      url: "/admin/dashboard/cart",
      icon: Car,
    },
  ],
  projects: [
    {
      name: "Administrar usuarios",
      url: "/admin/dashboard/usuarios",
      icon: BookUser,
    },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const userInfo = {
    name: user?.nombre || "Sin nombre",
    apellido: user?.apellido || "Sin apellido",
    email: user?.email || "Sin email",
    avatar: user?.avatar || "/avatars/shadcn.jpg",
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
