import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import UserLayout from "../layouts/UserLayout/UserLayout";
import FormSign from "../pages/Login/FormSign";
import FormLogin from "../pages/Login/FormLog";
import UserEmotion from "../pages/User/UserEmotion";
import UserHome from "../pages/User/UserHome";
import UserSetting from "../pages/User/UserSetting";
import Test from "../components/User/Emotion/Test/Test";
import Diary from "../components/User/Diary/Diary";
import UserRelax from "../pages/User/UserRelax";
import UserRelaxSeeAll from "../pages/User/UserRelaxSeeAll";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AdminContent from "../pages/Admin/AdminContent";
import AdminAdvise from "../pages/Admin/Advise";
import AdminUser from "../pages/Admin/AdminUser";
import AdminUserProfile from "../pages/Admin/AdminUserProfile";
import AdminHome from "../pages/Admin/AdminHome";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound/NotFound"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/signin" element={<FormSign />} />

       {/* <Route> */}
       <Route>
        <Route path="/userlayout" element={<UserLayout />}>
          <Route path="home" element={<UserHome />} />
          <Route path="home/test" element={<Test />} />
          <Route path="emotion" element={<UserEmotion />} />
          <Route path="setting" element={<UserSetting />} />
          <Route path="emotion/test" element={<Test />} />
          <Route path="diary" element={<Diary />} />
          <Route path="relax" element={<UserRelax />} />
          <Route path="*" element={<NotFound />}/>
          <Route path="/userlayout/relax/:slug" element={<UserRelaxSeeAll />} />
        </Route>


      </Route>
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/adminlayout" element={<AdminLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="user" element={<AdminUser />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="advise" element={<AdminAdvise />} />
          <Route path="setting" element={<UserSetting />} />
          <Route path="*" element={<NotFound />}/>
          {/* <Route path="consulting" element={<UserConsulting />} /> */}
          <Route path="user/:id" element={<AdminUserProfile />} />
        </Route>
        </Route>
      
    </Routes>
  );
}

export default AppRoutes;