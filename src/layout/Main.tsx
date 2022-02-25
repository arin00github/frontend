import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { Outlet, useRoutes } from "react-router";
import { Aside } from "./Aside";
import { useLocation } from "react-router";

export default function Main() {
  const router = useLocation();

  const renderMain = () => {
    if (router.pathname.includes("menu03")) {
      return (
        <Container maxW="100%">
          <Outlet />
        </Container>
      );
    } else {
      return (
        <Container maxW="80%">
          <Outlet />
        </Container>
      );
    }
  };

  return (
    <Box>
      <Aside />
      <Box pos="fixed" top={0} left="240px" w="calc(100% - 240px)" h="100vh">
        {renderMain()}
      </Box>
    </Box>
  );
}
