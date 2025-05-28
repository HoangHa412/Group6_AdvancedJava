import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Layout from "./components/layout/Layout";
import Profile from "./components/User/Profile";
import EditProfile from "./components/User/EditProfile";
import FriendPage from "./components/Relationship/FriendPage";

import SuggestFriendPage from "./components/Relationship/SuggestFriendPage";
import RequestFriendPage from "./components/Relationship/ReqestFriendPage";
import PostDetail from "./components/Post/PostDetail";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import ChatV2Index from "./components/ChatV2/ChatV2Index";
import SearchPage from "./components/Search/SearchPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHomePage from "./components/Home/AdminHomePage";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import AdminPostPage from "./components/Post/AdminPostPage";
import AdminUserPage from "./components/User/AdminUserPage";
import AdminClassPage from "./components/Class/AdminClassPage";

import "./DiAyTiOverridingStyles.scss";
import SearchLayout from "./components/Search/SearchLayout";
import SearchUserList from "./components/Search/SearchUserList";

import Developing from "./components/shared/Developing";
import UserCourseResult from "./components/UserCourse/UserCourseResult";
import Protect from "./components/Auth/Protect";
import RegisterConfirm from "./components/Auth/RegisterConfirm";
import ForgotPassword from "./components/Auth/Forgot-Password";
import ForgotPasswordConfirm from "./components/Auth/Forgot-PasswordCF";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register">
          <Route index element={<Register />} />
          <Route path=":token" element={<RegisterConfirm />} />
        </Route>
        <Route path="/reset">
          <Route index element={<ForgotPasswordConfirm />} />
          <Route path=":token" element={<ForgotPasswordConfirm />} />
        </Route>
        {/* private routes */}
        <Route element={<Protect allowedRoles={['USER']} />}>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route path="/profile/edit" element={<EditProfile />} />

            <Route path="/friends" element={<FriendPage />} />
            <Route path="/suggest-friends" element={<SuggestFriendPage />} />
            <Route path="/add-friends" element={<RequestFriendPage />} />
            <Route path="/profile/:profileId" element={<Profile />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/search" element={<SearchPage />} />
            <Route index path="/messenger-v2" element={<ChatV2Index />} />
            <Route path="/event" element={<Developing />} />
            <Route path="/celebrate" element={<Developing />} />
            <Route path="/saved" element={<Developing />} />

            {/* Search Route */}
            <Route path="/search" element={<SearchLayout />}>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/users" element={<SearchUserList />} />
            </Route>
          </Route>
        </Route>
        {/* Admin Route */}
        <Route element={<Protect allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/posts" element={<AdminPostPage />} />
            <Route path="/admin/classes" element={<AdminClassPage />} />
            <Route
              path="/admin/course-results"
              element={<UserCourseResult />}
            />
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
