import React from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { PageHeader } from "Layout/PageHeader";
import { PageBody } from "Layout/PageBody";

import Example01 from "Pages/react-table/example01";
import Example02 from "Pages/react-table/example02";
import Example03 from "Pages/react-table/example03";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

export default function IndexMenu01() {
  //console.log(dataCollection);

  const subNavList = [
    { title: "table01", url: "table01" },
    { title: "table02", url: "table02" },
    { title: "table03", url: "table03" },
  ];

  const renderNav = () => {
    return (
      <HStack>
        {subNavList.map((nav, idx) => (
          <Button key={`subnav${idx}`}>
            <Link to={nav.url}>{nav.title}</Link>
          </Button>
        ))}
      </HStack>
    );
  };

  return (
    <>
      <PageHeader>React Table</PageHeader>
      <PageBody>
        <Box mb={5}>{renderNav()}</Box>
      </PageBody>
      <Routes>
        <Route path="/" element={<Example01 />} />
        <Route path="table01" element={<Example01 />}></Route>
        <Route path="table02" element={<Example02 />}></Route>
        <Route path="table03" element={<Example03 />}></Route>
      </Routes>
    </>
  );
}
