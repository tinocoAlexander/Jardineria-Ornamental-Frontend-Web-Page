import { useEffect, useState, useCallback, useMemo } from "react";
import { useAppState } from "@/contexts/AppStateContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const { appointments, loadAppointments, services, loadServices } =
    useAppState();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    await Promise.all([loadAppointments(), loadServices()]);
    setLoading(false);
  }, [loadAppointments, loadServices]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalAppointments = appointments.length;
  const totalServices = services.filter((s) => s.activo).length;

  const citasPendientes = appointments.filter(
    (a) => a.atendido === "pendiente"
  ).length;
  const citasConfirmadas = appointments.filter(
    (a) => a.atendido === "confirmado"
  ).length;

  const citasHoy = useMemo(() => {
    const hoy = new Date().toISOString().slice(0, 10);
    return appointments.filter((a) => a.date.slice(0, 10) === hoy);
  }, [appointments]);

  const ultimasCitas = [...appointments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Resumen General</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white">
          <CardHeader>
            <CardTitle>Total Citas</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {totalAppointments}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
          <CardHeader>
            <CardTitle>Citas Pendientes</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {citasPendientes}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
          <CardHeader>
            <CardTitle>Citas Confirmadas</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {citasConfirmadas}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
          <CardHeader>
            <CardTitle>Servicios Activos</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {totalServices}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Citas de Hoy</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {citasHoy.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No hay citas para hoy.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {citasHoy.map((cita) => (
                    <TableRow key={cita._id}>
                      <TableCell>{cita.name}</TableCell>
                      <TableCell>{cita.service}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{cita.atendido}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas Citas Registradas</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {ultimasCitas.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No hay citas recientes.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ultimasCitas.map((cita) => (
                    <TableRow key={cita._id}>
                      <TableCell>{cita.name}</TableCell>
                      <TableCell>{cita.service}</TableCell>
                      <TableCell>
                        {new Date(cita.date).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
