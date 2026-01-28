
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex flex-1 overflow-hidden">
             <main className="flex-1 px-6 overflow-y-auto">
              <Outlet/>
              </main>
      </div>
    </div>
  );
}

export default Layout;
