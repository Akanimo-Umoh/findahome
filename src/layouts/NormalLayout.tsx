import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function NormalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 mt-18 md:mt-[66px]">
        <Outlet />
      </main>
    </div>
  );
}
