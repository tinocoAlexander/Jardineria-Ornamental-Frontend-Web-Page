import React, { createContext, useContext } from "react";
import { create } from "zustand";

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  atendido: "pendiente" | "confirmado" | "completado";
}

interface Service {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  activo: boolean;
}

interface AppState {
  appointments: Appointment[];
  services: Service[];
  content: {
    about: string;
    mission: string;
    vision: string;
  };
  addAppointment: (appointment: Omit<Appointment, "id" | "atendido">) => void;
  loadAppointments: () => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  updateContent: (field: keyof AppState["content"], value: string) => void;
  loadServices: () => Promise<void>;
  deleteService: (id: string) => void;
  createService: (
    serviceData: Omit<Service, "_id" | "activo">
  ) => Promise<void>;
  updateService: (id: string, updates: Partial<Service>) => Promise<void>;
  toggleEstadoService: (id: string) => Promise<void>;
}

const useAppStore = create<AppState>((set, get) => ({
  appointments: [],
  services: [],
  content: {
    about:
      "Jardinería Ornamental es una empresa líder en servicios profesionales de jardinería con más de 25 años de experiencia. Nos especializamos en soluciones innovadoras de automatización para el cuidado y mantenimiento de espacios verdes, combinando tradición artesanal con tecnología de vanguardia.",
    mission:
      "Transformar espacios verdes a través de tecnología inteligente y prácticas sostenibles, ofreciendo soluciones de mantenimiento que respetan el medio ambiente y superan las expectativas de nuestros clientes.",
    vision:
      "Ser la empresa de referencia en automatización de jardines en España, creando un mundo donde la tecnología y la naturaleza trabajen en perfecta armonía para espacios verdes más hermosos y sostenibles.",
  },

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
  addAppointment: async (appointment) => {
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

  updateContent: (field, value) => {
    const content = { ...get().content, [field]: value };
    set({ content });
    localStorage.setItem("jardineria_content", JSON.stringify(content));
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
