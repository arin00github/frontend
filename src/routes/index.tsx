import React from "react";
import { Route, Routes } from "react-router";
import LoginPage from "../pages/LoginPage";
import Main from "../layout/Main";
import RegisterPage from "Pages/RegisterPage";
import ChatPage from "Pages/ChatPage";
import IndexMenu03 from "Pages/menu03";
import IndexMenu04 from "Pages/menu04";
import NotFound from "Pages/NotFound";
import IndexMenu05 from "../pages/menu05/index";

export default function AppRoutes() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/" element={<Main />}>

          <Route path="chat" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
}
