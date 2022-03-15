import React from "react";
import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ImenuArray {
  title: string;
  index: number;
  url: string;
}

export function Aside() {
  const menuArray: ImenuArray[] = [
    { title: "home", url: "/", index: 0 },
    { title: "React Table", url: "/menu01/table01", index: 1 },
    { title: "Context API", url: "/menu02", index: 2 },
    { title: "OpenLayers", url: "/menu03", index: 3 },
    { title: "Naver map", url: "/menu04", index: 4 },
  ];

  const renderMenu = () => {
    return menuArray.map((menu) => (
      <ListItem
        key={`menu${menu.index}`}
        listStyleType="none"
        h="38px"
        lineHeight="38px"
        _hover={{ bg: "gray.100" }}
        px={5}
      >
        <Link to={menu.url}>{menu.title}</Link>
      </ListItem>
    ));
  };

  return (
    <Box
      w="240px"
      pos="fixed"
      h="100vh"
      top="0"
      left="0"
      borderRight="1px solid"
      borderColor="gray.200"
    >
      <Box>
        <UnorderedList m={0}>
          <Heading size="md" mb={2} mt={6} px={5}>
            otter0104
          </Heading>
          {renderMenu()}
        </UnorderedList>
      </Box>
    </Box>
  );
}
