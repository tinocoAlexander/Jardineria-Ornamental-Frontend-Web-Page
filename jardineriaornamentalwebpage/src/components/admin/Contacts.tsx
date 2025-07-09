import React, { useEffect, useState, useCallback } from "react";
import { useAppState } from "@/contexts/AppStateContext";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Loader2,
  Pencil,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConfirmDialog from "./components/ConfirmDialog";

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

  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [formState, setFormState] = useState<{
    [key: string]: { nombre: string; precio: number };
  }>({});

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadServices();
    } catch (err) {
      console.error("Error al cargar servicios:", err);
      setError(
        "No se pudieron cargar los servicios. Intenta de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  }, [loadServices]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filteredServices = services.filter(
    (servicio) =>
      servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (servicio: any) => {
    setEditMode((prev) => ({ ...prev, [servicio._id]: true }));
    setFormState((prev) => ({
      ...prev,
      [servicio._id]: { nombre: servicio.nombre, precio: servicio.precio },
    }));
  };

  const handleCancel = (id: string) => {
    setEditMode((prev) => ({ ...prev, [id]: false }));
  };

  const handleSave = async (id: string) => {
    const { nombre, precio } = formState[id];
    await updateService(id, { nombre, precio });
    setEditMode((prev) => ({ ...prev, [id]: false }));
  };

  const getStatusBadge = (activo: boolean) => {
    return activo ? (
      <Badge variant="default">Activo</Badge>
    ) : (
      <Badge variant="destructive">Inactivo</Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p>Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-600">
        <p className="mb-3">{error}</p>
        <Button onClick={fetchServices}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Servicios Registrados
        </h1>
        <Input
          type="text"
          placeholder="Buscar servicios por nombre o descripción..."
          className="w-full md:w-96 focus-visible:ring-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredServices.length === 0 ? (
        <p className="text-center text-muted-foreground mt-8">
          {searchTerm
            ? `No se encontraron servicios que coincidan con "${searchTerm}".`
            : "No hay servicios disponibles en este momento."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((servicio) => (
            <Card
              key={servicio._id}
              className="flex flex-col justify-between border border-muted hover:shadow-lg hover:-translate-y-1 transition-transform duration-300"
            >
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    {editMode[servicio._id] ? (
                      <>
                        <Input
                          className="text-xl font-bold mb-2"
                          value={formState[servicio._id]?.nombre || ""}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              [servicio._id]: {
                                ...prev[servicio._id],
                                nombre: e.target.value,
                              },
                            }))
                          }
                        />
                        <Input
                          type="number"
                          className="text-lg font-bold text-green-600 mb-2"
                          value={formState[servicio._id]?.precio || 0}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              [servicio._id]: {
                                ...prev[servicio._id],
                                precio: parseFloat(e.target.value),
                              },
                            }))
                          }
                        />
                      </>
                    ) : (
                      <>
                        <CardTitle className="text-xl font-bold text-gray-800">
                          {servicio.nombre}
                        </CardTitle>
                        <p className="text-green-600 font-bold text-lg mt-1">
                          ${servicio.precio.toFixed(2)} MXN
                        </p>
                      </>
                    )}
                  </div>

                  {/* Ícono que abre modal */}
                  {!editMode[servicio._id] && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-primary"
                        >
                          <Info className="w-5 h-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-gray-900">
                            {servicio.nombre}
                          </DialogTitle>
                          <DialogDescription asChild>
                            <div className="space-y-4 mt-2 text-gray-700">
                              <div>
                                <p className="text-sm font-bold text-muted-foreground">
                                  Descripción:
                                </p>
                                <p>
                                  {servicio.descripcion || "Sin descripción."}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-muted-foreground">
                                  Precio:
                                </p>
                                <p className="text-green-600 font-bold">
                                  ${servicio.precio?.toFixed(2)} MXN
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-bold text-muted-foreground">
                                  Estado:
                                </p>
                                <p>
                                  {servicio.activo ? (
                                    <Badge variant="default">Activo</Badge>
                                  ) : (
                                    <Badge variant="destructive">
                                      Inactivo
                                    </Badge>
                                  )}
                                </p>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {servicio.descripcion}
                </p>

                <div className="flex items-center justify-between">
                  {getStatusBadge(servicio.activo)}

                  <div className="flex gap-2">
                    {editMode[servicio._id] ? (
                      <>
                        <Button
                          onClick={() => handleSave(servicio._id)}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Guardar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleCancel(servicio._id)}
                          className="flex items-center gap-1"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(servicio)}
                        >
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleEstadoService(servicio._id)}
                        >
                          {servicio.activo ? (
                            <XCircle className="w-4 h-4 text-red-600" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </Button>
                        <ConfirmDialog
                          trigger={
                            <Button variant="outline" size="icon">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          }
                          title="Eliminar servicio"
                          description={`¿Estás seguro de eliminar el servicio "${servicio.nombre}"?`}
                          confirmText="Eliminar"
                          onConfirm={() => deleteService(servicio._id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Servicios;
