import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StatusFilter = "activos" | "inactivos" | "todos";

type Props = {
  filterStatus: StatusFilter;
  setFilterStatus: (val: "activos" | "inactivos" | "todos") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const ServiciosToolbar = ({
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Servicios Registrados
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Tabs
          value={filterStatus}
          onValueChange={(val) => setFilterStatus(val as StatusFilter)}
        >
          <TabsList>
            <TabsTrigger value="activos">Activos</TabsTrigger>
            <TabsTrigger value="inactivos">Inactivos</TabsTrigger>
            <TabsTrigger value="todos">Todos</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          placeholder="Buscar servicios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64"
        />
      </div>
    </div>
  );
};

export default ServiciosToolbar;
