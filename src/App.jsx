import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Reservation from "./pages/Reservation.jsx";

import Dashboard from "./pages/admin/Dashboard.jsx";
import PaidReservations from "./pages/admin/PaidReservations.jsx";
//import Calendario from "./pages/admin/Calendario.jsx";
import ReservasAdmin from "./pages/admin/ReservasAdmin.jsx";
import PaymentMethod from "./components/PaymentMethod.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminLayout from "./routes/AdminLayout.jsx";

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reservas" element={<Reservation />} />
      <Route path="/pagos" element={<PaymentMethod />} />

      {/* Rutas de administrador (protegidas con layout) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/pagos" element={<PaidReservations />} />
          <Route path="/admin/reservas" element={<ReservasAdmin />} />
          {/*<Route path="/admin/calendario" element={<Calendario />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}
