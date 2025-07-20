import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const getRandom = (min: number, max: number) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));

const CartStatus = () => {
  const [monitoring, setMonitoring] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [movement, setMovement] = useState(false);

  useEffect(() => {
    if (!monitoring) return;

    const interval = setInterval(() => {
      const newEntry = {
        time: new Date().toLocaleTimeString().slice(0, 8),
        temperature: getRandom(20, 30),
        humidity: getRandom(40, 60),
        movement: Math.random() > 0.5,
      };
      setData((prev) => [...prev.slice(-9), newEntry]);
      setMovement(newEntry.movement);
    }, 2000);

    return () => clearInterval(interval);
  }, [monitoring]);

  const last = data[data.length - 1] || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Estado del Carrito
        </h2>
        <div className="flex items-center gap-4">
          <Badge
            variant={monitoring ? "default" : "outline"}
            className={monitoring ? "bg-green-600" : "bg-gray-500"}
          >
            {monitoring ? "Monitoreando" : "Pausado"}
          </Badge>
          <Switch checked={monitoring} onCheckedChange={setMonitoring} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lecturas Actuales</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <SensorItem
            label="Temperatura"
            value={`${last.temperature ?? "--"} °C`}
          />
          <SensorItem label="Humedad" value={`${last.humidity ?? "--"} %`} />
          <SensorItem
            label="Movimiento"
            value={movement ? "Sí" : "No"}
            valueColor={movement ? "text-green-600" : "text-gray-500"}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gráfica de Sensores</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8">
          <Graph
            title="Temperatura (°C)"
            dataKey="temperature"
            data={data}
            color="#ef4444"
          />
          <Graph
            title="Humedad (%)"
            dataKey="humidity"
            data={data}
            color="#3b82f6"
          />
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground text-center">
        * Esta es una simulación de prueba. Los valores cambian cada 2 segundos.
      </div>
    </div>
  );
};

const SensorItem = ({
  label,
  value,
  valueColor = "text-gray-800 dark:text-gray-100",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className={`text-xl font-semibold ${valueColor}`}>{value}</p>
  </div>
);

const Graph = ({
  title,
  dataKey,
  data,
  color,
}: {
  title: string;
  dataKey: string;
  data: any[];
  color: string;
}) => (
  <div>
    <h4 className="mb-2 text-lg font-medium">{title}</h4>
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default CartStatus;
