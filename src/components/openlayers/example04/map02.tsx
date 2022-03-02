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
import MapContext from "./MapContext02";

export function MapBox2({ children }: any) {
  const [mapObj, setMapObj] = useState<{ map: Map }>({ map: null });

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

    const vectorLayer = new VectorLayer({
      background: "white",
      source: new VectorSource({
        url: "https://openlayers.org/data/vector/us-states.json",
        format: new GeoJSON(),
      }),
      style: function (feature) {
        const label = feature.get("name").split(" ").join("\n");
        labelStyle.getText().setText(label);
        return styleArray;
      },
      declutter: true,
    });

    const map = new Map({
      layers: [vectorLayer],
      target: "map_projection_02",
      view: new View({
        center: fromLonLat([-100, 38.5]),
        zoom: 4,
      }),
    });

    setMapObj({ map });

    //map.addLayer(vectorLayer);
  }, []);

  return <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>;
}
