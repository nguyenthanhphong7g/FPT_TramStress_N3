import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import UserLayout from "../layouts/UserLayout/UserLayout";
import FormSign from "../pages/Login/FormSign";
import FormLogin from "../pages/Login/FormLog";
import UserEmotion from "../pages/User/UserEmotion";
import UserHome from '../pages/User/UserHome';
import UserRelax from "../pages/User/UserRelax";

// Giả lập role, sau này sẽ lấy từ API hoặc state management
const userRole = "user"; // "admin" | "user" | "guest"

const ProtectedRoute = ({ allowedRoles }) => {
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/signin" element={<FormSign />} />

      <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
        <Route path="/userlayout" element={<UserLayout />}>
          <Route path="home" element={<UserHome />} />
          <Route path="emotion" element={<UserEmotion />} />
          <Route path="relax" element={<UserRelax />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;