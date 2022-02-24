import React, { useContext, useEffect } from "react";
export { default } from "./Map";
import MapContext from "./MapContext";
import Map from "./Map";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { Map as OlMap, View } from "ol";
import { useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export const MapBox = () => {
  const { map } = useContext<{ map: OlMap }>(MapContext);

  //const [view, setView] = useState();
  //const [zoom, setZoom] = useState();

  useEffect(() => {
    if (map !== null && map !== undefined) {
      console.log("map", map);
      const view = map.getView();

      console.log("view", view);

      //const view: any = map.getView();
      //const zoom: any = map.getZoom();
    }
  }, [map]);

  return (
    <Box>
      <div id="map" style={{ width: "100%", height: "400px" }}>
        <IconButton icon={<AddIcon />} aria-label="addzoom" />
        <IconButton icon={<MinusIcon />} aria-label="minuszoom" />
      </div>
    </Box>
  );
};
