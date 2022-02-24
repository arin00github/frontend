import React from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { PageHeader } from "Layout/PageHeader";
import { PageBody } from "Layout/PageBody";

import { Link, Route, Routes } from "react-router-dom";
import Example01 from "./example01";
import Example02 from "./example02";
import Example03 from "./example03";

export default function IndexMenu03() {
  const subNav: { title: string; url: string }[] = [
    { title: "example01", url: "example01" },
    { title: "example02", url: "example02" },
    { title: "example03", url: "example03" },
  ];

  const renderNav = () => {
    return (
      <HStack spacing={3} mb={4}>
        {subNav.map((navlist, idx) => (
          <Button key={`map_example_${idx}`} variant="unstyled">
            <Link to={navlist.url}>{navlist.title}</Link>
          </Button>
        ))}
      </HStack>
    );
  };

  return (
    <>
      <PageHeader>OpenLayer</PageHeader>
      <PageBody>
        {renderNav()}
        <Routes>
          <Route path="/" element={<Example01 />} />
          <Route path="example01" element={<Example01 />} />
          <Route path="example02" element={<Example02 />} />
          <Route path="example03" element={<Example03 />} />
        </Routes>
      </PageBody>
    </>
  );
}
