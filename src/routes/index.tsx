import React from "react";
import { Route, Routes } from "react-router";
import IndexHome from "../pages/home/index";
import Main from "../layout/Main";
import IndexMenu01 from "Pages/react-table";
import IndexMenu02 from "Pages/context-api";
import IndexMenu03 from "Pages/openlayers";
import IndexMenu04 from "Pages/naver-map";
import NotFound from "Pages/NotFound";
export default function AppRoutes() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<IndexHome />} />
          <Route path="react-table/*" element={<IndexMenu01 />} />
          <Route path="context-api" element={<IndexMenu02 />} />

          <Route path="openlayers/*" element={<IndexMenu03 />} />

          <Route path="naver-map" element={<IndexMenu04 />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
}
