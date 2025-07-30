import { BrowserRouter,Navigate,Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import NoDataFound from "./NoDataFound";

const Router = () => {
  const token = useSelector((state) => state.user.token);

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
        <Route path="*" element={<NoDataFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
