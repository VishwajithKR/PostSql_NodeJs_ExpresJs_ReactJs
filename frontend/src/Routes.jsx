import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import NoDataFound from "./NoDataFound";
import { useReusableQuery } from "./customHooks/useDataQuery";
import HomeScreenLoyout from "./layouts/HomeScreenLoyout";
import Edit from "./pages/Edit";

const Router = () => {
  const { data } = useReusableQuery({
    endpoint: "auth/me",
    withToken: true,
  });

  const isAuthenticated = data?.success;

  return (
    <BrowserRouter>
      <Routes>
          <Route element={ isAuthenticated ? <HomeScreenLoyout /> : <Navigate to="/login" replace />}>
            <Route path="/" index element={<Home data={data?.user} />} />
            <Route path="/todo" element={<Todo data={data?.user} />} />
            <Route path="/edit" element={<Edit data={data?.user} />} />
          </Route>

        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} />

        <Route path="*" element={<NoDataFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
