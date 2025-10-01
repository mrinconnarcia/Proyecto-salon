import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin.jsx";
import SidebarAdmin from "../components/SidebarAdmin.jsx";

export default function AdminLayout() {
  return (
    <div className="flex">
      <SidebarAdmin />
<<<<<<< HEAD
      <div className="flex-1 pl-64"> 
=======
      <div className="flex-1 pl-64"> {/* 🔹 Espacio para el sidebar fijo */}
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
        <NavbarAdmin />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> c549941e4dce969ffe7dc4dd543cbf0b6a411004
