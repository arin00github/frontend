import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router";
import { Aside } from "./Aside";

export default function Main() {
  return (
    <Box>
      <Aside />
      <Box pos="fixed" top={0} left="240px" w="calc(100% - 240px)" h="100vh">
        <Container maxW="80%">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
