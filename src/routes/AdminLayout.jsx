import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin.jsx";
import SidebarAdmin from "../components/SidebarAdmin.jsx";

export default function AdminLayout() {
  return (
  // ESTAS SON PARA ADMIN, PUEDO REUTILIZAR DEL HOME DEL USUARIO NORMAL
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
