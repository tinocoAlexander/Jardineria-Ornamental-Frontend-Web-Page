import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useAppState } from "@/contexts/AppStateContext";

const AgregarServicioModal = () => {
  const { createService } = useAppState();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.nombre.trim() !== "" &&
      formData.descripcion.trim() !== "" &&
      formData.precio.trim() !== "" &&
      !isNaN(parseFloat(formData.precio)) &&
      parseFloat(formData.precio) > 0
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createService({
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        precio: parseFloat(formData.precio),
      });
      setFormData({ nombre: "", descripcion: "", precio: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      alert("Error al crear el servicio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Agregar servicio
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Nuevo Servicio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del servicio"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción detallada del servicio"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="precio">Precio (MXN)</Label>
            <Input
              id="precio"
              name="precio"
              type="number"
              min={0}
              step="0.01"
              value={formData.precio}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={handleSubmit} disabled={!isFormValid() || loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgregarServicioModal;
