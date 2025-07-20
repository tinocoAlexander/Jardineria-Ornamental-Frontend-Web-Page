import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Info,
  BadgeDollarSign,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/contexts/AppStateContext";

const ServicioDetalleModal = ({ servicio }: { servicio: Service }) => (
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

    <DialogContent className="max-w-lg rounded-xl px-6 py-5">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
          <Info className="w-5 h-5" />
          Detalles del Servicio
        </DialogTitle>
      </DialogHeader>

      <div className="mt-4 space-y-5 text-sm text-foreground">
        <div className="flex items-start gap-3">
          <ClipboardList className="w-5 h-5 text-muted-foreground mt-1" />
          <div>
            <p className="text-xs uppercase text-muted-foreground font-medium">
              Nombre
            </p>
            <p className="text-base font-semibold">{servicio.nombre}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <BadgeDollarSign className="w-5 h-5 text-muted-foreground mt-1" />
          <div>
            <p className="text-xs uppercase text-muted-foreground font-medium">
              Precio
            </p>
            <p className="text-green-600 font-bold text-base">
              ${servicio.precio?.toFixed(2)} MXN
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ClipboardList className="w-5 h-5 text-muted-foreground mt-1" />
          <div>
            <p className="text-xs uppercase text-muted-foreground font-medium">
              Descripción
            </p>
            <p className="text-sm">
              {servicio.descripcion || "Sin descripción disponible."}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-muted-foreground mt-1" />
          <div>
            <p className="text-xs uppercase text-muted-foreground font-medium">
              Estado
            </p>
            <Badge
              variant={servicio.activo ? "default" : "destructive"}
              className="mt-1"
            >
              {servicio.activo ? "Activo" : "Inactivo"}
            </Badge>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default ServicioDetalleModal;
