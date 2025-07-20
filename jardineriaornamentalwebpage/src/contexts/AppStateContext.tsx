import React, { createContext, useContext } from "react";
import { create } from "zustand";

export interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  atendido: "pendiente" | "confirmado" | "completado";
}

export interface Content {
  _id: string;
  seccion: string;
  descripcion: string;
  imagenUrl?: string;
  activo: boolean;
}

export interface Service {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  activo: boolean;
}

export interface User {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion?: string;
  rol: "admin" | "empleado";
  activo: boolean;
  avatar?: string;
  createdAt?: string;
}

interface AppState {
  //Citas
  appointments: Appointment[];
  addAppointment: (appointment: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    message: string;
  }) => Promise<void>;
  loadAppointments: () => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  //Servicios
  services: Service[];
  loadServices: () => Promise<void>;
  deleteService: (id: string) => void;
  createService: (
    serviceData: Omit<Service, "_id" | "activo">
  ) => Promise<void>;
  updateService: (id: string, updates: Partial<Service>) => Promise<void>;
  toggleEstadoService: (id: string) => Promise<void>;
  //Contenido
  content: Content[];
  loadContent: () => Promise<void>;
  createContent: (contentData: Omit<Content, "_id">) => Promise<void>;
  updateContent: (id: string, updates: Partial<Content>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  toggleActivo: (id: string) => Promise<void>;
  //Usuarios
  users: User[];
  loadUsers: () => Promise<void>;
  createUser: (userData: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: string;
    direccion?: string;
    rol: "admin" | "empleado";
  }) => Promise<void>;
}

const useAppStore = create<AppState>((set, get) => ({
  appointments: [],
  services: [],
  content: [],
  users: [],

  // Servicios
  loadServices: async () => {
    try {
      const res = await fetch("http://localhost:4000/api/services");
      if (!res.ok) throw new Error("Error al cargar servicios");

      const data: Service[] = await res.json();
      set({ services: data });
    } catch (error) {
      console.error("❌ Error cargando servicios:", error);
    }
  },

  deleteService: async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const res = await fetch(`http://localhost:4000/api/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al eliminar el servicio");

      set({
        services: get().services.filter((service) => service._id !== id),
      });
    } catch (error) {
      console.error("Fallo al eliminar el servicio:", error);
    }
  },

  createService: async (serviceData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const res = await fetch("http://localhost:4000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
      });

      if (!res.ok) throw new Error("Error al crear el servicio");

      const nuevoServicio = await res.json();
      set({ services: [...get().services, nuevoServicio] });
    } catch (error) {
      console.error("❌ Error al crear el servicio:", error);
      throw error;
    }
  },

  updateService: async (id, updates) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const res = await fetch(`http://localhost:4000/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Error al actualizar el servicio");

      const updatedService = await res.json();

      set({
        services: get().services.map((service) =>
          service._id === id ? updatedService : service
        ),
      });
    } catch (error) {
      console.error("❌ Error al actualizar el servicio:", error);
    }
  },

  toggleEstadoService: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const res = await fetch(
        `http://localhost:4000/api/services/${id}/estado`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Error al cambiar el estado del servicio");

      const updatedService = await res.json();

      set({
        services: get().services.map((service) =>
          service._id === id ? updatedService : service
        ),
      });
    } catch (error) {
      console.error("❌ Error al cambiar el estado del servicio:", error);
    }
  },

  //Citas
  addAppointment: async (appointment: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    message: string;
  }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });

      if (!response.ok) throw new Error("Error al crear cita");

      const nueva = await response.json();
      const updated = [...get().appointments, nueva];
      set({ appointments: updated });
    } catch (error) {
      console.error("❌ No se pudo agendar la cita:", error);
      throw error;
    }
  },

  loadAppointments: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const res = await fetch("http://localhost:4000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al cargar citas");

      const citas: Appointment[] = await res.json();

      set({
        appointments: citas.map((cita) => ({ ...cita, id: cita._id })),
      });
      console.log("Citas:", citas);
    } catch (error) {
      console.error("Error al cargar citas:", error);
    }
  },

  updateAppointment: async (id, updates) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const res = await fetch(`http://localhost:4000/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Error al actualizar la cita");

      const updatedAppointment = await res.json();

      set({
        appointments: get().appointments.map((apt) =>
          apt._id === id ? updatedAppointment : apt
        ),
      });
    } catch (error) {
      console.error("Fallo al actualizar la cita:", error);
    }
  },

  deleteAppointment: async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const res = await fetch(`http://localhost:4000/api/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Error al eliminar la cita");
      }

      set({
        appointments: get().appointments.filter((apt) => apt._id !== id),
      });
    } catch (error) {
      console.error("Fallo al eliminar la cita:", error);
    }
  },

  //Contenido
  loadContent: async () => {
    try {
      const res = await fetch("http://localhost:4000/api/content");
      if (!res.ok) throw new Error("Error al cargar contenido");
      const data: Content[] = await res.json();
      set({ content: data });
    } catch (error) {
      console.error("❌ Error cargando contenido:", error);
    }
  },

  createContent: async (contentData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");
      const res = await fetch(`http://localhost:4000/api/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contentData),
      });
      if (!res.ok) throw new Error("Error al crear contenido");
      const nuevo = await res.json();
      set({ content: [...get().content, nuevo] });
    } catch (error) {
      console.error("❌ Error al crear contenido:", error);
    }
  },

  updateContent: async (id, updates) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");
      const res = await fetch(`http://localhost:4000/api/content/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Error al actualizar contenido");
      const updated = await res.json();
      set({
        content: get().content.map((c) => (c._id === id ? updated : c)),
      });
    } catch (error) {
      console.error("❌ Error al actualizar contenido:", error);
    }
  },

  deleteContent: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");
      const res = await fetch(`http://localhost:4000/api/content/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al eliminar contenido");
      set({ content: get().content.filter((c) => c._id !== id) });
    } catch (error) {
      console.error("❌ Error al eliminar contenido:", error);
    }
  },

  toggleActivo: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");
      const res = await fetch(
        `http://localhost:4000/api/content/${id}/activo`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Error al cambiar estado");
      const updated = await res.json();
      set({
        content: get().content.map((c) => (c._id === id ? updated.content : c)),
      });
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
    }
  },

  //Usuarios
  loadUsers: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar usuarios");
      const data = await res.json();
      set({ users: data });
    } catch (error) {
      console.error("❌ Error al cargar usuarios:", error);
    }
  },

  createUser: async (userData) => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error("Error al registrar usuario");
      const result = await res.json();
      set({ users: [...get().users, result] });
      await get().loadUsers(); // Recargar usuarios
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
      throw error;
    }
  },
}));

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useAppStore();

  return (
    <AppStateContext.Provider value={store}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
