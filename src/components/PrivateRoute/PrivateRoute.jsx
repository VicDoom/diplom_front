import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useJwt } from "react-jwt";

export const PrivateRoute = ({ route }) => {
  const token = useSelector(state => state.auth.token);
  const { isExpired } = useJwt(token);
  return token && !isExpired ? route : <Navigate to={"/auth"} />;
};