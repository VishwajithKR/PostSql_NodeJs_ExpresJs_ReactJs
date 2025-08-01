import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const HomeScreenLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <main className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-6xl mx-auto w-full bg-white shadow-md rounded-xl p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HomeScreenLayout;
