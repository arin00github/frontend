import React, { useContext, useEffect, useRef, useState } from "react";
import { getPointResolution, get as getProjection, transform } from "ol/proj";
import { Box, Input, Select } from "@chakra-ui/react";
import { useMapDispatch, useMapState } from "./MapProvider01";
import Map from "ol/Map";
import { View } from "ol";
import { OSM } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import "ol/ol.css";

export const Map01 = () => {
  const { map, value } = useMapState();

  const dispatch = useMapDispatch();

  const [option, setOption] = useState<string>("EPSG:3857");

  const handleChange = (e: any) => {
    setOption(e.target.value);
    const updateValue = e.target.value;
    dispatch({ type: "CHANGE_INPUT", value: updateValue });
  };

  function onChangeProjection(projValue: string) {
    console.log("onChangeProjection");
    const currentView = map.getView();
    const currentProjection = currentView.getProjection();
    const newProjection = getProjection(projValue);
    const currentResolution = currentView.getResolution();
    const currentCenter = currentView.getCenter();
    const currentRotation = currentView.getRotation();
    const newCenter = transform(
      currentCenter,
      currentProjection,
      newProjection
    );
    const currentPointResolution = getPointResolution(
      currentProjection,
      1,
      currentCenter,
      "m"
    );
    const newPointResolution = getPointResolution(
      newProjection,
      1,
      newCenter,
      "m"
    );
    const newResolution =
      (currentResolution * currentPointResolution) / newPointResolution;
    const newView = new View({
      center: newCenter,
      resolution: newResolution,
      rotation: currentRotation,
      projection: newProjection,
    });
    map.setView(newView);

    dispatch({ type: "CHANGE_MAP", map: map });
  }

  useEffect(() => {
    const projection = value;

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map_projection_01",
      view: new View({
        center: transform([0, 52], "EPSG:4326", projection),
        zoom: 6,
        projection: projection,
      }),
    });
    dispatch({ type: "CHANGE_MAP", map });
  }, []);

  // useEffect(() => {
  //   if (map !== null) {
  //     console.log("update", map);
  //     onChangeProjection(value);
  //   }
  // }, [value, option]);

  return (
    <>
      <Box id="map_projection_01" h="450px" w="100%"></Box>
      <Select value={option} id="view-projection" onChange={handleChange}>
        <option value="EPSG:3857">Spherical Mercator (EPSG:3857)</option>
        <option value="EPSG:4326">WGS 84 (EPSG:4326)</option>
      </Select>
    </>
  );
};
