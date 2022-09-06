import React, { useEffect, useState } from "react";

import { MapBox01 } from "Components/openlayers/example03/MapBox01";
import { MapBox02 } from "Components/openlayers/example03/MapBox02";
import { MapBox03 } from "Components/openlayers/example03/MapBox03";
import { MapBox04 } from "Components/openlayers/example03/MapBox04";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

export default function Example03() {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (idx: number) => {
    setTabIndex(idx);
  };

  //렌더를 즉시 해줘야 한다.

  return (
    <div>
      <Tabs onChange={handleTabChange} index={tabIndex}>
        <TabList>
          <Tab>Cluster Features</Tab>
          <Tab>Dynamic Cluster</Tab>
          <Tab>Label Decluttering</Tab>
          <Tab>Basic Layer</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>{tabIndex === 0 && <MapBox04 />}</TabPanel>
          <TabPanel px={0}>{tabIndex === 1 && <MapBox03 />}</TabPanel>
          <TabPanel px={0}>{tabIndex === 2 && <MapBox02 />}</TabPanel>
          <TabPanel px={0}>{tabIndex === 3 && <MapBox01 />}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
