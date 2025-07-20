import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || "",
    avatarUrl: user?.avatar || "",
    fileBase64: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!form.apellido.trim())
      newErrors.apellido = "El apellido es obligatorio.";

    if (!form.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d{10}$/.test(form.telefono)) {
      newErrors.telefono = "El teléfono debe tener exactamente 10 dígitos.";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [form.nombre, form.apellido, form.telefono]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    validateForm();
    if (!isValid) return;

    setLoading(true);
    await updateProfile({
      nombre: form.nombre,
      apellido: form.apellido,
      telefono: form.telefono,
      direccion: form.direccion,
      avatar: form.fileBase64 || form.avatarUrl,
    });
    setLoading(false);
  };

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
            <Avatar className="h-28 w-28 shadow border">
              <AvatarImage
                src={
                  form.fileBase64 || form.avatarUrl || "/avatars/default.jpg"
                }
                alt="Avatar"
              />
              <AvatarFallback>
                {form.nombre.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="grid w-full md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="file-upload">Subir imagen</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
              </div>

              <div>
                <Label htmlFor="avatar-url">O usar URL</Label>
                <Input
                  id="avatar-url"
                  placeholder="https://ejemplo.com/avatar.jpg"
                  value={form.avatarUrl}
                  onChange={(e) => handleChange("avatarUrl", e.target.value)}
                />
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
              />
            </div>
          </div>

          {/* Datos no editables */}
          <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" value={user?.email} disabled />
            </div>

            <div>
              <Label htmlFor="rol">Rol</Label>
              <Input id="rol" value={user?.role} disabled />
            </div>
          </div>

          {/* Botón */}
          <Button
            onClick={handleSave}
            disabled={loading || !isValid}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
