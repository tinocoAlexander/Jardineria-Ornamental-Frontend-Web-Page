import { useEffect, useState, useCallback } from "react";
import { useAppState } from "@/contexts/AppStateContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import AppointmentsToolbar from "./components/AppointmentsToolbar";
import AppointmentRow from "./components/AppointmentRow";

const Appointments = () => {
  const {
    appointments,
    loadAppointments,
    updateAppointment,
    deleteAppointment,
  } = useAppState();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      await loadAppointments();
    } catch (err) {
      console.error("Error al cargar citas:", err);
    } finally {
      setLoading(false);
    }
  }, [loadAppointments]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const filtered = appointments.filter((app) => {
    const matchesStatus =
      filterStatus === "todos" ? true : app.atendido === filterStatus;
    const matchesSearch = app.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedAppointments = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [appointments, filterStatus, searchTerm]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p>Cargando citas...</p>
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

        <AppointmentsToolbar
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
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
                <AppointmentRow
                  key={app._id}
                  appointment={app}
                  updateAppointment={updateAppointment}
                  deleteAppointment={deleteAppointment}
                />
              ))}
            </TableBody>

            {filtered.length === 0 && (
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
          {filtered.length > itemsPerPage && (
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
