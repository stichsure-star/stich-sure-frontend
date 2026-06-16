import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ role }) => {
  const { token, user } = useSelector((state) => state.auth);
  console.log("user", user);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  if (!user.profile) {
    return <Navigate to="/designerverification" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
