import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./contexts/AuthContext";
import { AppStateProvider } from "./contexts/AppStateContext";
import AuthRoutes from "./contexts/AuthRoutes";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import { LoginForm } from "./pages/AdminPanel";
import Appointments from "./components/admin/Appointments";
import ContentManager from "./components/admin/ContentManager";
import CartStatus from "./components/admin/CarStatus";
import Page from "./components/admin/Layout";
import Dashboard from "./components/admin/dashboard";
import Servicios from "./components/admin/Service";
import Usuarios from "./components/admin/Users";
import Perfil from "./components/admin/Profile";

function App() {
  return (
    <AuthProvider>
      <AppStateProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<LoginForm />} />
              <Route path="/error500" element={<Error500 />} />
              <Route path="*" element={<Error404 />} />

              <Route
                path="/admin/dashboard"
                element={
                  <AuthRoutes>
                    <Page />
                  </AuthRoutes>
                }
              >
                <Route index element={<Dashboard/>} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="service" element={<Servicios />} />
                <Route path="content" element={<ContentManager />} />
                <Route path="cart" element={<CartStatus />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="perfil" element={<Perfil />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AppStateProvider>
    </AuthProvider>
  );
}

export default App;
