import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function NavbarAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 🔹 Limpia el usuario del contexto
    navigate("/login"); // Redirige al login
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between">
      <span>Bienvenido, {user?.name}</span>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </nav>
  );
}
