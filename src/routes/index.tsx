import React from "react";
import { Route, Routes } from "react-router";
import IndexHome from "../pages/home/index";
import Main from "../layout/Main";
import IndexMenu01 from "Pages/menu01";
import IndexMenu02 from "Pages/menu02";
import IndexMenu03 from "Pages/menu03";
import IndexMenu04 from "Pages/menu04";
import NotFound from "Pages/NotFound";
import Example01 from "../pages/menu03/example01";
import Example02 from "Pages/menu03/example02";
import Example03 from "Pages/menu03/example03";
import ListPage from "../pages/menu03/ListPage";

export default function AppRoutes() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<IndexHome />} />
          <Route path="menu01" element={<IndexMenu01 />} />
          <Route path="menu02" element={<IndexMenu02 />} />

          <Route path="menu03/*" element={<IndexMenu03 />} />

          <Route path="menu04" element={<IndexMenu04 />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
}
