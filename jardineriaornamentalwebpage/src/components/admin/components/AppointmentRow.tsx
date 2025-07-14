import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Trash2, Eye } from "lucide-react";
import AppointmentModal from "./AppointmentModal";
import ConfirmDialog from "./ConfirmDialog";

const AppointmentRow = ({
  appointment,
  updateAppointment,
  deleteAppointment,
}: {
  appointment: any;
  updateAppointment: (id: string, data: any) => void;
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
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              updateAppointment(appointment._id, { atendido: "confirmado" })
            }
          >
            <Check className="w-4 h-4 text-blue-600" />
          </Button>
        )}
        {appointment.atendido === "confirmado" && (
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              updateAppointment(appointment._id, { atendido: "completado" })
            }
          >
            <Check className="w-4 h-4 text-green-600" />
          </Button>
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
