import { useContext } from "react";
import { AuthContext } from "../context/authcontext"
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  return user ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;