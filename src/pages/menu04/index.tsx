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
import MapBox01 from "Components/naver/MapBox01";
import MapBox02 from "Components/naver/MapBox02";
import MapBox03 from "Components/naver/MapBox03";
import MapBox04 from "Components/naver/MapBox04";
import MapBox05 from "Components/naver/MapBox05";

export default function IndexMenu04() {
  const [markers, setMarkers] = useState(null);

  return (
    <Box>
      <Heading my={10}>Naver Map API</Heading>
      <Tabs>
        <TabList>
          <Tab>layer toggle</Tab>
          <Tab>marker control</Tab>
          <Tab>marker cluster</Tab>
          <Tab>미니맵</Tab>
          <Tab>이벤트 기본 예제</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <MapBox01 />
          </TabPanel>
          <TabPanel px={0}>
            <MapBox02 />
          </TabPanel>
          <TabPanel px={0}>
            <MapBox03 />
          </TabPanel>
          <TabPanel px={0}>
            <MapBox04 />
          </TabPanel>
          <TabPanel px={0}>
            <MapBox05 />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
