import { useEffect, useState, useCallback } from "react";
import { useAppState } from "@/contexts/AppStateContext";
import { Check, Trash2, Eye, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import ConfirmDialog from "./components/ConfirmDialog";
import AppointmentModal from "./components/AppointmentModal";

const Appointments = () => {
  const {
    appointments,
    loadAppointments,
    updateAppointment,
    deleteAppointment,
  } = useAppState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadAppointments();
    } catch (err) {
      console.error("Error al cargar citas:", err);
      setError("No se pudieron cargar las citas. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  }, [loadAppointments]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    setCurrentPage(1); // Reset a la primera página si cambian las citas
  }, [appointments]);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p>Cargando citas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-600">
        <p className="mb-3">{error}</p>
        <Button onClick={fetchAppointments}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Citas Programadas
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableCaption>Listado de citas registradas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAppointments.map((app) => (
                <TableRow key={app._id}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell>{app.service}</TableCell>
                  <TableCell>
                    {new Date(app.date).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(app.atendido)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {app.atendido === "pendiente" && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateAppointment(app._id, { atendido: "confirmado" })
                        }
                      >
                        <Check className="w-4 h-4 text-blue-600" />
                      </Button>
                    )}

                    {app.atendido === "confirmado" && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateAppointment(app._id, { atendido: "completado" })
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
                      appointment={app}
                    />
                    <ConfirmDialog
                      trigger={
                        <Button variant="outline" size="icon">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      }
                      title="Eliminar cita"
                      description="¿Estás seguro de que quieres eliminar esta cita? No se podrá recuperar."
                      confirmText="Eliminar"
                      onConfirm={() => deleteAppointment(app._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {appointments.length === 0 && (
              <TableFooter>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No hay citas disponibles.
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>

          {/* PAGINACIÓN */}
          {appointments.length > itemsPerPage && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
