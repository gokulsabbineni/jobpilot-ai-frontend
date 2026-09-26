import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";

import "../styles/Admin.css";

export default function AdminLayout() {
  return (
    <div className="admin-app">
      <AdminSidebar />

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}