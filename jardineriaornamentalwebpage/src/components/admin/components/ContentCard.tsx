import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Trash2, CheckCircle, XCircle } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import { Content } from "@/contexts/AppStateContext";

type Props = {
  item: Content;
  isEditing: boolean;
  formState: Partial<Content>;
  onEdit: () => void;
  onChange: (field: keyof Content, value: string | boolean) => void;
  onSave: () => void;
  onCancel: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

const ContentCard = ({
  item,
  isEditing,
  formState,
  onEdit,
  onChange,
  onSave,
  onCancel,
  onToggle,
  onDelete,
}: Props) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-row justify-between items-center">
        <Label className="capitalize text-lg font-semibold">
          {item.seccion}
        </Label>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={onToggle}>
            {item.activo ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </Button>
          <ConfirmDialog
            trigger={
              <Button variant="outline" size="icon">
                <Trash2 className="w-4 h-4 text-red-600" />
              </Button>
            }
            title="Eliminar contenido"
            description="¿Estás seguro de eliminar este contenido?"
            confirmText="Eliminar"
            onConfirm={onDelete}
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        {isEditing ? (
          <>
            <div className="mb-2">
              <Label>Sección</Label>
              <Input
                value={formState.seccion || ""}
                onChange={(e) => onChange("seccion", e.target.value)}
              />
            </div>
            <div className="mb-2">
              <Label>Descripción</Label>
              <Textarea
                rows={3}
                value={formState.descripcion || ""}
                onChange={(e) => onChange("descripcion", e.target.value)}
              />
            </div>
            <div className="mb-2">
              <Label>Imagen URL</Label>
              <Input
                value={formState.imagenUrl || ""}
                onChange={(e) => onChange("imagenUrl", e.target.value)}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button onClick={onSave}>
                <CheckCircle className="w-4 h-4 mr-1" /> Guardar
              </Button>
              <Button variant="outline" onClick={onCancel}>
                <XCircle className="w-4 h-4 mr-1" /> Cancelar
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm whitespace-pre-line line-clamp-4">
              {item.descripcion}
            </p>
            {item.imagenUrl && (
              <img
                src={item.imagenUrl}
                alt={item.seccion}
                className="max-w-full max-h-40 object-cover rounded-md"
              />
            )}
            <Button variant="ghost" onClick={onEdit}>
              Editar
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentCard;
