import React from "react";
import { Box } from "@chakra-ui/react";
import MapProvider from "Components/openlayers/example01/Map";
import { MapBox } from "Components/openlayers/example01/index";

export default function Example01() {
  return (
    <div>
      <MapProvider>
        <MapBox />
      </MapProvider>
    </div>
  );
}
