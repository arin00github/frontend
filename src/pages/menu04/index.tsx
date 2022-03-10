import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
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
import MapBox06 from "Components/naver/MapBox06";

export default function IndexMenu04() {
  //지역코드번호, 중앙값, zoom값, center 값
  const [selectedReg, setSelectedReg] =
    useState<{ code: string; center: any }>(undefined);
  // console.log(selectedReg);

  return (
    <Box>
      <Heading my={10}>Naver Map API</Heading>
      <Tabs>
        <TabList>
          <Tab>geojson data</Tab>
          <Tab>layer toggle</Tab>
          <Tab>marker control</Tab>
          {/* <Tab>marker cluster</Tab> */}
          <Tab>ui control</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <Flex>
              <MapBox05
                handleSelect={(code: string, center) => {
                  console.log(code);
                  setSelectedReg({
                    code: code,
                    center: center,
                  });
                }}
              />
              <MapBox06
                selectedReg={selectedReg}
                handleSelect={(code: string) => {
                  console.log(code);
                }}
              />
            </Flex>
          </TabPanel>
          <TabPanel px={0}>
            <MapBox01 />
          </TabPanel>
          <TabPanel px={0}>
            <MapBox02 />
          </TabPanel>
          {/* <TabPanel px={0}>
            <MapBox03 />
          </TabPanel> */}
          <TabPanel px={0}>
            <MapBox04 />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
