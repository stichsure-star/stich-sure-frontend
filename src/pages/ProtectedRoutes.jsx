import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ role }) => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // 🔥 prevent crash
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  console.log("user", user);
  console.log(" this is token", token);

  if (!user) {
    return null;
  }

  // 🔥 role protection
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
