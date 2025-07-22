import { useEffect, useMemo, useState } from "react";
import { useAppState } from "@/contexts/AppStateContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import UserCard from "./components/UserCard";
import RoleGuard from "./components/RoleGuard";

const initialUser = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  telefono: "",
  direccion: "",
  rol: "empleado" as "empleado" | "admin",
};

const Usuarios = () => {
  const { users, loadUsers, createUser } = useAppState();
  const [loading, setLoading] = useState(true);
  const [formTouched, setFormTouched] = useState(false);
  const [newUser, setNewUser] = useState(initialUser);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.email) setCurrentUserEmail(payload.email);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
    loadUsers().finally(() => setLoading(false));
  }, [loadUsers]);

  const isFormValid = useMemo(() => {
    const { nombre, apellido, email, password, telefono } = newUser;
    return (
      nombre.trim() &&
      apellido.trim() &&
      password.trim() &&
      telefono.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
  }, [newUser]);

  const handleCreate = async () => {
    setFormTouched(true);
    if (!isFormValid) return;

    try {
      await createUser(newUser);
      setNewUser(initialUser);
      setFormTouched(false);
    } catch (err) {
      console.error("Error al crear usuario:", err);
      alert("Error al crear usuario");
    }
  };

  const handleInputChange = (field: keyof typeof newUser, value: string) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const filteredUsers = useMemo(
    () => users.filter((u) => u.email !== currentUserEmail),
    [users, currentUserEmail]
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Usuarios</h2>
        <RoleGuard allow={["admin"]}>
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Agregar Usuario
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[450px]">
              <SheetHeader>
                <SheetTitle>Nuevo Usuario</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {(
                  [
                    ["Nombre", "nombre"],
                    ["Apellido", "apellido"],
                    ["Email", "email"],
                    ["Password", "password"],
                    ["Teléfono", "telefono"],
                    ["Dirección (opcional)", "direccion"],
                  ] as [string, keyof typeof newUser][]
                ).map(([label, key]) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <Input
                      type={key === "password" ? "password" : "text"}
                      value={newUser[key] || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className={
                        formTouched &&
                        !newUser[key]?.trim() &&
                        key !== "direccion"
                          ? "border-red-500"
                          : ""
                      }
                    />
                    {formTouched &&
                      !newUser[key]?.trim() &&
                      key !== "direccion" && (
                        <p className="text-xs text-red-500 mt-1">
                          Este campo es obligatorio.
                        </p>
                      )}
                  </div>
                ))}
                <div>
                  <Label>Rol</Label>
                  <select
                    className="w-full border rounded-md p-2 text-sm"
                    value={newUser.rol}
                    onChange={(e) =>
                      handleInputChange(
                        "rol",
                        e.target.value as "admin" | "empleado"
                      )
                    }
                  >
                    <option value="empleado">Empleado</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCreate}
                  disabled={!isFormValid}
                >
                  Crear Usuario
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </RoleGuard>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[88px] rounded-xl" />
          ))}
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center text-muted-foreground mt-12">
          No hay otros usuarios registrados aún.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Usuarios;
