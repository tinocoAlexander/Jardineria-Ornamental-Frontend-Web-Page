import { useState } from "react";
import { CheckCircle, XCircle, Trash2, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ConfirmDialog from "./ConfirmDialog";
import ServicioDetalleModal from "./ServicioDetalleModal";
import type { Service } from "../../../contexts/AppStateContext";

interface ServicioCardProps {
  servicio: Service;
  updateService: (id: string, updates: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => void;
  toggleEstadoService: (id: string) => Promise<void>;
}

const ServicioCard: React.FC<ServicioCardProps> = ({
  servicio,
  updateService,
  deleteService,
  toggleEstadoService,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({
    nombre: servicio.nombre,
    precio: servicio.precio,
  });

  const handleSave = async () => {
    await updateService(servicio._id, formState);
    setEditMode(false);
  };

  const getStatusBadge = (activo: boolean) =>
    activo ? (
      <Badge variant="default">Activo</Badge>
    ) : (
      <Badge variant="destructive">Inactivo</Badge>
    );

  return (
    <Card
      className={`flex flex-col justify-between border ${
        servicio.activo
          ? "border-muted"
          : "border-red-200 bg-gray-100 opacity-75"
      } hover:shadow-lg transition-transform duration-300`}
    >
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            {editMode ? (
              <>
                <Input
                  value={formState.nombre}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      nombre: e.target.value,
                    }))
                  }
                  className="text-xl font-bold mb-2"
                />
                <Input
                  type="number"
                  value={formState.precio}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      precio: parseFloat(e.target.value),
                    }))
                  }
                  className="text-lg text-green-600 font-bold"
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
          {!editMode && <ServicioDetalleModal servicio={servicio} />}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm">{servicio.descripcion}</p>

        <div className="flex items-center justify-between">
          {getStatusBadge(servicio.activo)}
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button onClick={handleSave} className="gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Guardar
                </Button>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  <XCircle className="w-4 h-4" />
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditMode(true)}
                >
                  <Pencil className="w-4 h-4 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () => {
                    try {
                      await toggleEstadoService(servicio._id);
                    } catch (error) {
                      console.error("❌ Error al cambiar el estado:", error);
                      alert(
                        "Hubo un problema al cambiar el estado del servicio."
                      );
                    }
                  }}
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
                  description={`¿Eliminar "${servicio.nombre}"?`}
                  confirmText="Eliminar"
                  onConfirm={() => deleteService(servicio._id)}
                />
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicioCard;
