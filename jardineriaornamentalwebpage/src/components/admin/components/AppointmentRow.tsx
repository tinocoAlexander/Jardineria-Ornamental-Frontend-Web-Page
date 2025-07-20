import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Trash2, Eye } from "lucide-react";
import AppointmentModal from "./AppointmentModal";
import ConfirmDialog from "./ConfirmDialog";
import { Appointment } from "@/contexts/AppStateContext";

const AppointmentRow = ({
  appointment,
  updateAppointment,
  deleteAppointment,
}: {
  appointment: Appointment;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
}) => {
  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Badge variant="secondary">Pendiente</Badge>;
      case "confirmado":
        return <Badge variant="default">Confirmado</Badge>;
      case "completado":
        return <Badge variant="default">Completado</Badge>;
      default:
        return <Badge variant="destructive">Desconocido</Badge>;
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{appointment.name}</TableCell>
      <TableCell>{appointment.service}</TableCell>
      <TableCell>
        {new Date(appointment.date).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </TableCell>
      <TableCell>{getStatusBadge(appointment.atendido)}</TableCell>
      <TableCell className="text-right space-x-2">
        {appointment.atendido === "pendiente" && (
          <ConfirmDialog
            trigger={
              <Button variant="outline" size="icon">
                <Check className="w-4 h-4 text-blue-600" />
              </Button>
            }
            title="Confirmar cita"
            description="¿Deseas marcar esta cita como confirmada?"
            confirmText="Confirmar"
            onConfirm={() =>
              updateAppointment(appointment._id, { atendido: "confirmado" })
            }
            confirmClassName="bg-blue-600 hover:bg-blue-700"
          />
        )}
        {appointment.atendido === "confirmado" && (
          <ConfirmDialog
            trigger={
              <Button variant="outline" size="icon">
                <Check className="w-4 h-4 text-green-600" />
              </Button>
            }
            title="Completar cita"
            description="¿Deseas marcar esta cita como completada?"
            confirmText="Completar"
            onConfirm={() =>
              updateAppointment(appointment._id, { atendido: "completado" })
            }
            confirmClassName="bg-green-600 hover:bg-green-700"
          />
        )}
        <AppointmentModal
          trigger={
            <Button variant="outline" size="icon">
              <Eye className="w-4 h-4 text-purple-600" />
            </Button>
          }
          appointment={appointment}
        />
        <ConfirmDialog
          trigger={
            <Button variant="outline" size="icon">
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          }
          title="Eliminar cita"
          description="¿Estás seguro de eliminar esta cita?"
          confirmText="Eliminar"
          onConfirm={() => deleteAppointment(appointment._id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default AppointmentRow;
