import React, { useEffect, useState } from "react";
import { useAppState } from "@/contexts/AppStateContext";
import { Loader2 } from "lucide-react";
import ServiciosToolbar from "./components/ServiciosToolbar";
import ServicioCard from "./components/ServicioCard";

const Servicios: React.FC = () => {
  const {
    services,
    loadServices,
    deleteService,
    updateService,
    toggleEstadoService,
  } = useAppState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "todos" | "activos" | "inactivos"
  >("activos");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        await loadServices();
      } catch (err) {
        setError("Error al cargar servicios.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [loadServices]);

  const filteredServices = services.filter((servicio) => {
    const matchesSearch =
      servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "todos"
        ? true
        : filterStatus === "activos"
        ? servicio.activo
        : !servicio.activo;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p>Cargando servicios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <ServiciosToolbar
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {filteredServices.length === 0 ? (
        <p className="text-center text-muted-foreground mt-8">
          No se encontraron servicios.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((servicio) => (
            <ServicioCard
              key={servicio._id}
              servicio={servicio}
              updateService={updateService}
              deleteService={deleteService}
              toggleEstadoService={toggleEstadoService}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Servicios;
