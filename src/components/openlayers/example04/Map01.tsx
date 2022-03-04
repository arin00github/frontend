import React, { useContext, useEffect, useRef, useState } from "react";
import { getPointResolution, get as getProjection, transform } from "ol/proj";
import { Box, Input, Select } from "@chakra-ui/react";
import { MapContext01 } from "./MapContext01";
import { View } from "ol";

export const Map01 = () => {
  const [value, setValue] = useState<string>("EPSG:3857");

  const { map1, projValue, setProjValue } = useContext(MapContext01);

  const handleChange = (e: any) => {
    setValue(e.target.value);
    setProjValue(e.target.value);
  };

  const selecRef = useRef(null);

  function onChangeProjection(projValue: string) {
    const currentView = map1.getView();
    const currentProjection = currentView.getProjection();
    const newProjection = getProjection(projValue);
    const currentResolutioin = currentView.getResolution();
    const currentCenter = currentView.getCenter();
    const currentRotation = currentView.getRotation();

    console.log(
      currentProjection,
      currentResolutioin,
      currentCenter,
      currentRotation
    );
    // const newCenter = transform(
    //   currentCenter,
    //   currentProjection,
    //   newProjection
    // );
    // const currentPointResolution = getPointResolution(
    //   currentProjection,
    //   1,
    //   currentCenter,
    //   "m"
    // );
    // const newPointResolution = getPointResolution(
    //   newProjection,
    //   1,
    //   newCenter,
    //   "m"
    // );
    // const newResolution =
    //   (currentResolutioin * currentPointResolution) / newPointResolution;
    // const newView = new View({
    //   center: newCenter,
    //   resolution: newResolution,
    //   rotation: currentRotation,
    //   projection: newProjection,
    // });

    // map1.setView(newView);
  }

  useEffect(() => {
    if (map1 !== null && map1 !== undefined) {
      //selecRef.current.addEventListner('change', onChangeProjection)
      console.log("projValue", projValue);
      onChangeProjection(projValue);
    }
  }, [map1, projValue]);

  return (
    <>
      <Box id="map_projection_01" h="450px" w="100%"></Box>
      <Select
        value={value}
        //defaultValue="EPSG:3857"
        id="view-projection"
        ref={selecRef}
        onChange={handleChange}
      >
        <option value="EPSG:3857">Spherical Mercator (EPSG:3857)</option>
        <option value="EPSG:4326">WGS 84 (EPSG:4326)</option>
      </Select>
    </>
  );
};
