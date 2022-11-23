import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RoomPage from "./pages/RoomPage";
import MyPage from "./pages/MyPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import CreatePartyPage from "./pages/CreatePartyPage";
import UpdatePartyPage from "./pages/UpdatePartyPage";
import FindIdPage from "./pages/FindIdPage";
import FindpwdPage from "./pages/FindpwdPage";
import InvitePage from "./pages/InvitePage";
import NotFound from "./pages/NotFound";
import GuidePage from "./pages/GuidePage"

function App() {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<GuidePage />} path="/guide" />
        <Route element={<LoginPage />} path="/login/:roomIdx" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<FindIdPage />} path="/findId" />
        <Route element={<FindpwdPage />} path="/findPwd" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<RoomPage />} path="/room/:roomIdx" />
        <Route element={<MyPage />} path="/mypage" />
        <Route element={<UpdateUserPage />} path="/mypage/update" />
        <Route element={<CreatePartyPage />} path="/createparty" />
        <Route element={<UpdatePartyPage />} path="/updateparty/:roomIdx" />
        <Route element={<InvitePage />} path="/invite/:roomIdx" />
        <Route element={<NotFound />} path="/*" />
      </Routes>
    </>
  );
}

export default App;
