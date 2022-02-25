import React, { useEffect, useState } from "react";

import { MapBox } from "Components/openlayers/example03/map";
import { MapBox2 } from "Components/openlayers/example03/map02";
import { MapBox3 } from "Components/openlayers/example03/map03";
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
import MapContext3 from "Components/openlayers/example03/MapContext03";
import MapContext from "Components/openlayers/example03/MapContext01";

export default function Example03() {
  const { map } = useContext<{ map: Map }>(MapContext);
  const { map3 } = useContext<{ map3: Map }>(MapContext3);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (idx: number) => {
    setTabIndex(idx);
  };

  const renderMap01 = () => {
    return (
      <MapBox>
        <Box id="map1" h="450px" w="100%"></Box>
      </MapBox>
    );
  };

  //렌더를 즉시 해줘야 한다.
  const renderMap02 = () => {
    return (
      <MapBox2>
        <Box id="map2" h="450px" w="100%"></Box>
      </MapBox2>
    );
  };

  const renderMap03 = () => {
    console.log(map3);

    return (
      <MapBox3>
        <Box id="map4" h="450px" w="100%"></Box>
      </MapBox3>
    );
  };
  useEffect(() => {
    if (tabIndex === 0) {
      console.log(map); /// render가 한발 늦어서 null 값이 나옴 => render함수를 컴포넌트화 시켜야 함
    }
  }, [tabIndex, map]);

  return (
    <div>
      <Tabs onChange={handleTabChange} index={tabIndex}>
        <TabList>
          <Tab>Basic Layer</Tab>
          <Tab>Label Decluttering</Tab>
          <Tab>Tile Selection</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>{tabIndex === 0 && renderMap01()}</TabPanel>
          <TabPanel px={0}>{tabIndex === 1 && renderMap02()}</TabPanel>
          <TabPanel px={0}>{tabIndex === 2 && renderMap03()}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
