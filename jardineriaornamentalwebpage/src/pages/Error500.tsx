import { Hammer, Leaf} from "lucide-react";
import { Link } from "react-router-dom";

function Error500() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-ornamental-50 to-red-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg p-10 bg-white shadow-2xl rounded-3xl border border-red-100">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full shadow mb-6">
          <Hammer className="h-10 w-10" />
        </div>
        <h1 className="text-5xl font-script font-bold text-red-700 mb-4">
          Error del Servidor
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Algo salió mal en nuestro jardín digital. Estamos trabajando para
          solucionarlo.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-ornamental-500 to-ornamental-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <Leaf className="h-5 w-5" />
          <span>Volver al Inicio</span>
        </Link>
      </div>
    </section>
  );
}

export default Error500;
