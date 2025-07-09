import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AppointmentModalProps {
  trigger: React.ReactNode;
  appointment: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    message: string;
    atendido: boolean | string;
  };
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  trigger,
  appointment,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalles de la Cita</DialogTitle>
          <DialogDescription>
            Información completa de la cita agendada.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          <p>
            <strong>Nombre:</strong> {appointment.name}
          </p>
          <p>
            <strong>Email:</strong> {appointment.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {appointment.phone}
          </p>
          <p>
            <strong>Servicio:</strong> {appointment.service}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(appointment.date).toLocaleString()}
          </p>
          {appointment.message && (
            <p>
              <strong>Mensaje:</strong> {appointment.message}
            </p>
          )}
          <p>
            <strong>Estado:</strong>{" "}
            {appointment.atendido === true ||
            appointment.atendido === "completed"
              ? "Completado"
              : appointment.atendido}
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
