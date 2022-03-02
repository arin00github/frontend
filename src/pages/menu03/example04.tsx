import React, { useEffect, useState } from "react";

import { MapBox01 } from "Components/openlayers/example04/MapBox01";
import { MapBox2 } from "Components/openlayers/example04/map02";
import { MapBox3 } from "Components/openlayers/example04/map03";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Map } from "ol";
import MapContext3 from "Components/openlayers/example04/MapContext03";
import MapContext1 from "Components/openlayers/example04/MapContext01";

export default function Example04() {
  const { map1 } = useContext<{ map1: Map }>(MapContext1);
  const { map3 } = useContext<{ map3: Map }>(MapContext3);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (idx: number) => {
    setTabIndex(idx);
  };

  //렌더를 즉시 해줘야 한다.
  const renderMap02 = () => {
    return (
      <MapBox2>
        <Box id="map_projection_02" h="450px" w="100%"></Box>
      </MapBox2>
    );
  };

  const renderMap03 = () => {
    console.log(map3);

    return (
      <MapBox3>
        <Box id="map_projection_03" h="450px" w="100%"></Box>
      </MapBox3>
    );
  };
  useEffect(() => {
    if (tabIndex === 0) {
      console.log("page", map1); /// render가 한발 늦어서 null 값이 나옴 => render함수를 컴포넌트화 시켜야 함
    }
  }, [tabIndex, map1]);

  return (
    <div>
      <Tabs onChange={handleTabChange} index={tabIndex}>
        <TabList>
          <Tab>Projection and Scale</Tab>
          <Tab>WMS without Projection</Tab>
          <Tab>Raster Reprojection</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>{tabIndex === 0 && <MapBox01 />}</TabPanel>
          <TabPanel px={0}>{tabIndex === 1 && renderMap02()}</TabPanel>
          <TabPanel px={0}>{tabIndex === 2 && renderMap03()}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
