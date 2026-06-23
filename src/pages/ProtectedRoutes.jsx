import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { SkeletonPage } from "../components/reuasbleComponents/Skeleton";

const ProtectedRoutes = ({ role }) => {
  const { token, user } = useSelector((state) => state.auth);
  console.log("user", user);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <SkeletonPage />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "designer" && !user.profile) {
    return <Navigate to="/designerverification" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
