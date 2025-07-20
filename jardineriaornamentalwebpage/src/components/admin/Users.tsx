import { useEffect, useState } from "react";
import { useAppState } from "@/contexts/AppStateContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

const Usuarios = () => {
  const { users, loadUsers, createUser } = useAppState();
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [newUser, setNewUser] = useState<{
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: string;
    direccion?: string;
    rol: "empleado" | "admin";
  }>({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
    rol: "empleado",
  });

  useEffect(() => {
    const decoded = localStorage.getItem("token");
    if (decoded) {
      const payload = JSON.parse(atob(decoded.split(".")[1]));
      setCurrentUserEmail(payload.email);
    }
    loadUsers().finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    const { nombre, email, password, apellido, telefono } = newUser;

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !email.trim() ||
      !password.trim() ||
      !telefono.trim()
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Ingresa un correo electrónico válido.");
      return;
    }

    try {
      await createUser(newUser);
      setNewUser({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        telefono: "",
        direccion: "",
        rol: "empleado",
      });
    } catch (err) {
      console.error("Error al crear usuario:", err);
      alert("Error al crear usuario");
    }
  };

  const filteredUsers = users.filter((u) => u.email !== currentUserEmail);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Usuarios</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Usuario
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[450px]">
            <SheetHeader>
              <SheetTitle>Nuevo Usuario</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div>
                <Label>Nombre</Label>
                <Input
                  value={newUser.nombre}
                  onChange={(e) =>
                    setNewUser({ ...newUser, nombre: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Apellido</Label>
                <Input
                  value={newUser.apellido}
                  onChange={(e) =>
                    setNewUser({ ...newUser, apellido: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={newUser.telefono}
                  onChange={(e) =>
                    setNewUser({ ...newUser, telefono: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Dirección (opcional)</Label>
                <Input
                  value={newUser.direccion}
                  onChange={(e) =>
                    setNewUser({ ...newUser, direccion: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Rol</Label>
                <select
                  className="w-full border rounded-md p-2 text-sm"
                  value={newUser.rol}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      rol: e.target.value as "admin" | "empleado",
                    })
                  }
                >
                  <option value="empleado">Empleado</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <Button className="w-full" onClick={handleCreate}>
                Crear Usuario
              </Button>
            </div>
          </SheetContent>
        </Sheet>
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
            <HoverCard key={user._id}>
              <HoverCardTrigger asChild>
                <div className="bg-card hover:bg-accent transition-colors p-4 rounded-xl shadow cursor-pointer border">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.nombre} />
                      <AvatarFallback className="text-lg">
                        {user.nombre.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{user.nombre}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                Registrado el{" "}
                <span className="font-medium">
                  {new Date(user.createdAt!).toLocaleDateString()}
                </span>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Usuarios;
