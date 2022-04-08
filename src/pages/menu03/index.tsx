import React from "react";
import {
  Box,
  Button,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { PageHeader } from "Layout/PageHeader";

import { Link, Outlet, Route, Routes } from "react-router-dom";

import Example02 from "./example02";
import Example02_2 from "./example02_2";
import Example03 from "./example03";
import Example04 from "./example04";
import ListPage from "./ListPage";

export default function IndexMenu03() {
  return (
    <>
      <PageHeader>OpenLayer</PageHeader>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="example02" element={<Example02 />}></Route>
        <Route path="example02_2" element={<Example02_2 />}></Route>
        <Route path="example03" element={<Example03 />}></Route>
        <Route path="example04" element={<Example04 />}></Route>
      </Routes>
    </>
  );
}
