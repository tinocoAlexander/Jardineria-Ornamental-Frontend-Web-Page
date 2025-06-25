import React, { createContext, useContext } from 'react';
import { create } from 'zustand';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed';
}

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

interface AppState {
  appointments: Appointment[];
  contacts: Contact[];
  content: {
    about: string;
    mission: string;
    vision: string;
  };
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  addContact: (contact: Omit<Contact, 'id' | 'date'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  updateContent: (field: keyof AppState['content'], value: string) => void;
}

const useAppStore = create<AppState>((set, get) => ({
  appointments: JSON.parse(localStorage.getItem('jardineria_appointments') || '[]'),
  contacts: JSON.parse(localStorage.getItem('jardineria_contacts') || '[]'),
  content: {
    about: 'Jardinería Ornamental es una empresa líder en servicios profesionales de jardinería con más de 25 años de experiencia. Nos especializamos en soluciones innovadoras de automatización para el cuidado y mantenimiento de espacios verdes, combinando tradición artesanal con tecnología de vanguardia.',
    mission: 'Transformar espacios verdes a través de tecnología inteligente y prácticas sostenibles, ofreciendo soluciones de mantenimiento que respetan el medio ambiente y superan las expectativas de nuestros clientes.',
    vision: 'Ser la empresa de referencia en automatización de jardines en España, creando un mundo donde la tecnología y la naturaleza trabajen en perfecta armonía para espacios verdes más hermosos y sostenibles.'
  },
  
  addAppointment: (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'pending' as const
    };
    const appointments = [...get().appointments, newAppointment];
    set({ appointments });
    localStorage.setItem('jardineria_appointments', JSON.stringify(appointments));
  },
  
  addContact: (contact) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    const contacts = [...get().contacts, newContact];
    set({ contacts });
    localStorage.setItem('jardineria_contacts', JSON.stringify(contacts));
  },
  
  updateAppointment: (id, updates) => {
    const appointments = get().appointments.map(apt => 
      apt.id === id ? { ...apt, ...updates } : apt
    );
    set({ appointments });
    localStorage.setItem('jardineria_appointments', JSON.stringify(appointments));
  },
  
  deleteAppointment: (id) => {
    const appointments = get().appointments.filter(apt => apt.id !== id);
    set({ appointments });
    localStorage.setItem('jardineria_appointments', JSON.stringify(appointments));
  },
  
  updateContent: (field, value) => {
    const content = { ...get().content, [field]: value };
    set({ content });
    localStorage.setItem('jardineria_content', JSON.stringify(content));
  }
}));

const AppStateContext = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};