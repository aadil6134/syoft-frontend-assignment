import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = (props) => {
  const token = Cookie.get("user_data");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
