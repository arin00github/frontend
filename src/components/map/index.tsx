import React, { useContext } from "react";
export { default } from "./Map";
import MapContext from "./MapContext";
import Map from "./Map";
import { Box, Button, IconButton } from "@chakra-ui/react";

export const MapBox = () => {
  const { map } = useContext(MapContext);

  console.log("map", map);

  return (
    <Box>
      <Button></Button>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </Box>
  );
};
