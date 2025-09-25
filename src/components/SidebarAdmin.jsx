// components/SidebarAdmin.jsx
import { NavLink } from "react-router-dom";

export default function SidebarAdmin() {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Calendario", path: "/admin/calendario" },
    { name: "Reservas", path: "/admin/reservas" },
    { name: "Pagos", path: "/admin/pagos" },
  ];

  return (
    <aside
      className="fixed top-0 left-0 h-full w-64 shadow-lg border-r z-40"
      style={{ backgroundColor: "#D2B074", border: "None" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-900 to-orange-950 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-900 to-orange-950 bg-clip-text text-transparent">
                Casa Chetumal
              </h1>
              <p className="text-sm text-gray-900">Eventos Especiales</p>
            </div>
      </div>

      {/* Menú */}
      <nav className="mt-6 flex flex-col space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `mb-2 px-6 py-4 text-2xl font-medium transition-all duration-300 rounded-r-3xl ${
                isActive
                  ? "text-white shadow-sm"
                  : "text-amber-700 hover:text-white"
              }`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#d3a24dff" : "transparent",
              borderBottom: isActive ? "2px solid #fff" : "2px solid transparent",
              borderRight: isActive ? "2px solid #fff" : "2px solid transparent",
              borderTop: isActive ? "2px solid #fff" : "2px solid transparent",
            })}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
