import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";

import UserLayout from "../layouts/UserLayout/UserLayout";
import FormSign from "../pages/Login/FormSign";
import FormLogin from "../pages/Login/FormLog";
import UserEmotion from "../pages/User/UserEmotion";
import UserHome from '../pages/User/UserHome';
import UserSetting from "../pages/User/UserSetting";
import Test from "../components/User/Emotion/Test/Test";
import Diary from "../components/User/Diary/Diary"
import UserRelax from "../pages/User/UserRelax";
import UserRelaxSeeAll from "../pages/User/UserRelaxSeeAll";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import UserConsulting from "../pages/User/UserConsulting";
import AdminUser from "../pages/Admin/AdminUser";
import AdminUserProfile from "../pages/Admin/AdminUserProfile";
import AdminHome from "../pages/Admin/AdminHome";

// // Giả lập role, sau này sẽ lấy từ API hoặc state management
// const userRole = "user"; // "admin" | "user" | "guest"

// const ProtectedRoute = ({ allowedRoles }) => {
//   if (!allowedRoles.includes(userRole)) {
//     return <Navigate to="/" replace />;
//   }
//   return <Outlet />;
// };

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} exact/>
      <Route path="/signin" element={<FormSign />} />

       <Route>
        <Route path="/userlayout" element={<UserLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<UserHome />} />
          <Route path="home/test" element={<Test />} />
          <Route path="emotion" element={<UserEmotion />} />
          <Route path="setting" element={<UserSetting />} />
          <Route path="emotion/test" element={<Test />} />
          <Route path="diary" element={<Diary />} />
          <Route path="relax" element={<UserRelax />} />
          <Route path="/userlayout/relax/:slug" element={<UserRelaxSeeAll />} />
          <Route path="*" element={<NotFound/>}/>
          <Route path='consulting' element={<UserConsulting />} />
        </Route>
      </Route>
      
    </Routes>
  );
}

export default AppRoutes;
