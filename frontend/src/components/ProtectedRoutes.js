import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element: Element, isAdmin, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return null; // Show a loader or nothing while loading

  if (!isAuthenticated) {
    return <Navigate to="/login-signup" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login-signup" />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoutes;
