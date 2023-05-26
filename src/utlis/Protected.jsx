import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../contexs/auth";

const Protected = () => {
  const { auth } = useAuth();
  return auth?.token !== null ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default Protected;
