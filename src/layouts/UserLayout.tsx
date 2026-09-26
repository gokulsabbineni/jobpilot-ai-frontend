import { Outlet } from "react-router-dom";

import UserSidebar from "../components/user/UserSidebar";

export default function UserLayout() {
  return (
    <div className="user-app">
      <UserSidebar />

      <main className="user-main">
        <Outlet />
      </main>
    </div>
  );
}