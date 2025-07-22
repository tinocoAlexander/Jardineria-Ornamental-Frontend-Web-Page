import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmDialog from "./components/ConfirmDialog";
import AvatarPreview from "./components/ProfileAvatarPreview";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || "",
    avatarUrl: user?.avatar || "",
    fileBase64: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "nombre":
        return !value.trim() ? "El nombre es obligatorio." : undefined;
      case "apellido":
        return !value.trim() ? "El apellido es obligatorio." : undefined;
      case "telefono":
        if (!value.trim()) return "El teléfono es obligatorio.";
        if (!/^\d{10}$/.test(value)) return "Debe tener 10 dígitos.";
        return undefined;
      case "avatarUrl":
        return value.trim() && !/^https?:\/\/.+\..+/.test(value)
          ? "URL inválida."
          : undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error || "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        fileBase64: reader.result as string,
        avatarUrl: "",
      }));
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    handleChange("avatarUrl", url);
    setForm((prev) => ({ ...prev, fileBase64: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConfirmSave = async () => {
    if (Object.values(errors).some((e) => e)) return;

    setLoading(true);
    await updateProfile({
      nombre: form.nombre,
      apellido: form.apellido,
      telefono: form.telefono,
      direccion: form.direccion,
      avatar: form.fileBase64 || form.avatarUrl,
    });
    setForm((prev) => ({ ...prev, fileBase64: "" }));
    setLoading(false);
  };

  const isFormValid = Object.values(errors).every((e) => !e);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Perfil del Usuario</CardTitle>
          <CardDescription>
            Puedes actualizar tu nombre, imagen de perfil y otros datos.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center border rounded-lg p-4 gap-4">
            <AvatarPreview
              src={form.fileBase64 || form.avatarUrl}
              fallback={(
                form.nombre?.charAt(0) ||
                user?.nombre?.charAt(0) ||
                "U"
              ).toUpperCase()}
            />

            <div className="grid w-full md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="file-upload">Subir nueva imagen</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="cursor-pointer"
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="avatar-url">O usar URL</Label>
                <Input
                  id="avatar-url"
                  placeholder="https://ejemplo.com/avatar.jpg"
                  value={form.avatarUrl}
                  onChange={handleUrlChange}
                  className={errors.avatarUrl ? "border-red-500" : ""}
                  disabled={loading}
                />
                {errors.avatarUrl && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.avatarUrl}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Datos personales */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={form.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className={errors.nombre ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.nombre && (
                <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>
              )}
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={form.apellido}
                onChange={(e) => handleChange("apellido", e.target.value)}
                className={errors.apellido ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.apellido && (
                <p className="text-sm text-red-500 mt-1">{errors.apellido}</p>
              )}
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={form.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                className={errors.telefono ? "border-red-500" : ""}
                disabled={loading}
              />
              {errors.telefono && (
                <p className="text-sm text-red-500 mt-1">{errors.telefono}</p>
              )}
            </div>
            <div>
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={form.direccion}
                onChange={(e) => handleChange("direccion", e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Datos fijos */}
          <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" value={user?.email || ""} disabled />
            </div>
            <div>
              <Label htmlFor="rol">Rol</Label>
              <Input id="rol" value={user?.role || "desconocido"} disabled />
            </div>
          </div>

          <ConfirmDialog
            trigger={
              <Button
                disabled={loading || !isFormValid}
                className="w-full mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Guardando...
                  </span>
                ) : (
                  "Guardar cambios"
                )}
              </Button>
            }
            title="¿Confirmar cambios?"
            description="Estás a punto de actualizar la información de tu perfil. ¿Deseas continuar?"
            confirmText="Guardar"
            cancelText="Cancelar"
            onConfirm={handleConfirmSave}
            confirmClassName="bg-blue-600 hover:bg-blue-700"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
