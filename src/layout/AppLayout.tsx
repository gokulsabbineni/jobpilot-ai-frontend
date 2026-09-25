import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}
      <div className="main-shell">
        <Header onMenu={() => setMobileOpen(true)} />
        <main className="page-content"><Outlet /></main>
      </div>
    </div>
  );
}