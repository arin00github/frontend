import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import "ol/ol.css";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Fill, Stroke, Style, Text } from "ol/style";
import { fromLonLat } from "ol/proj";
import { useMapState } from "./MapProvider02";
import { useDispatch } from "react-redux";

export function Map02({ children }: any) {
  const dispatch = useDispatch();

  const { map, value } = useMapState();

  let mapObject;

  useEffect(() => {
    const labelStyle = new Style({
      text: new Text({
        font: "12px Calibri, sans-serif",
        overflow: true,
        fill: new Fill({
          color: "#000",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 3,
        }),
      }),
    });

    const countryStyle = new Style({
      fill: new Fill({
        color: "rgba(255,255,255,0.6)",
      }),
      stroke: new Stroke({
        color: "#319fd3",
        width: 1,
      }),
    });

    const styleArray = [countryStyle, labelStyle];

    const usGeoJson = new VectorSource({
      url: "https://openlayers.org/data/vector/us-states.json",
      format: new GeoJSON(),
    });

    const vectorLayer = new VectorLayer({
      background: "white",
      source: usGeoJson,
      style: function (feature) {
        const label = feature.get("name").split(" ").join("\n");
        labelStyle.getText().setText(label);
        return styleArray;
      },
      declutter: true,
    });

    mapObject = new Map({
      layers: [vectorLayer],
      target: "map_cluster_02",
      view: new View({
        center: fromLonLat([-100, 38.5]),
        zoom: 4,
      }),
    });

    mapObject.once("click", (event) => {
      const source = vectorLayer.getSource();
      //console.log(source);
      const features = source.getFeatures();
      features.forEach((feature) => {
        const type = feature.getGeometry().getType();
        console.log(type);
      });
    });

    dispatch({ type: "CHANGE_MAP", map: mapObject });

    //map.addLayer(vectorLayer);
  }, []);

  return <Box id="map_cluster_02" h="560px" w="100%"></Box>;
}
