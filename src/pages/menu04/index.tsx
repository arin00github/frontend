import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import MapBox01 from "Components/naver/MapBox01";
import MapBox02 from "Components/naver/MapBox02";

export default function IndexMenu04() {
  return (
    <Box>
      <Heading my={10}>Naver Map API</Heading>
      <Tabs>
        <TabList>
          <Tab>marker control</Tab>
          <Tab>layer toggle</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <MapBox02 />
          </TabPanel>
          <TabPanel px={0}>
            <MapBox01 />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
