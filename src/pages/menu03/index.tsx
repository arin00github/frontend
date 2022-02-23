import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { PageHeader } from "Layout/PageHeader";
import { PageBody } from "Layout/PageBody";
import { useContext } from "react";
import MapContext from "Components/map/MapContext";
import Map from "Components/map/Map";
import { MapBox } from "../../components/map/index";

export default function IndexMenu03() {
  const { map } = useContext(MapContext);

  console.log("map", map);

  return (
    <>
      <PageHeader>OpenLayer</PageHeader>
      <PageBody>
        <Text>openlayer 사전 테스트 해보기</Text>
        <Map>
          <MapBox />
        </Map>
      </PageBody>
    </>
  );
}
