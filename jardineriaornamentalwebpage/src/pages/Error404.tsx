import { Leaf, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

function Error404() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-ornamental-50 to-nature-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg p-8 bg-white shadow-2xl rounded-3xl border border-ornamental-100">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-ornamental-100 text-ornamental-600 rounded-full shadow mb-6">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h1 className="text-5xl font-script font-bold text-ornamental-700 mb-4">
          ¡Vaya!
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          La página que buscas no existe o ha sido movida.
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

export default Error404;
