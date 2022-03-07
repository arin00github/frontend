import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import MapBox01 from "Components/naver/MapBox01";

export default function IndexMenu04() {
  //const { naver } = window;
  //console.log(naver);

  const [mapZoom, setMapZoom] = useState(undefined);

  // const jejuData = new naver.maps.LatLng(33.3590628, 126.534361);
  // const seoulData = new naver.maps.LatLng(37.511337, 127.012084);

  // const gotoJeju = () => {
  //   map.setCenter(jejuData);
  //   map.setZoom(10);
  // };

  // const gotoSeoul = () => {
  //   map.setCenter(seoulData);
  //   map.setZoom(11);
  // };

  return (
    <Box>
      <Heading my={10}>Naver Map API</Heading>
      <MapBox01 />
    </Box>
  );
}
