import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import "ol/ol.css";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import { Cluster, Vector as VectorSource, XYZ } from "ol/source";
import { Geometry, LineString, Point, Polygon } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { createEmpty, extend, getWidth } from "ol/extent";
import { fromLonLat } from "ol/proj";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style";
import { Box, Text } from "@chakra-ui/react";

import RenderFeature from "ol/render/Feature";
import { useEffect } from "react";
import { useState } from "react";
import { useMapState } from "./MapProvider01";

export const Map01 = ({ children }: any) => {
  const [featureInfo, setFeatureInfo] = useState<string>("");
  const [mapObj, setMapObj] = useState<{ map: Map }>({ map: null });

  useEffect(() => {
    const style = new Style({
      fill: new Fill({
        color: "#eeeeee",
      }),
    });

    const vectorLayer = new VectorLayer({
      background: "#1a2b39",
      source: new VectorSource({
        url: "https://openlayers.org/data/vector/ecoregions.json",
        format: new GeoJSON(),
      }),
      style: function (feature) {
        //console.log(feature);
        const color = feature.get("COLOR") || "#eeeeee";
        style.getFill().setColor(color);
        return style;
      },
    });
    const map = new Map({
      layers: [vectorLayer],
      target: "map_cluster_01",
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
    });

    const featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: map,
      style: new Style({
        stroke: new Stroke({
          color: "rgba(255, 255, 255, 0.7)",
          width: 2,
        }),
      }),
    });

    let highlight: Feature<Geometry>;

    const displayFeatureInfo = (pixel: any) => {
      //마우스 위에 hover했을 때 잡히는 vector 객체가 있는지 없는지
      const feature = map.forEachFeatureAtPixel(
        //Detect features that intersect a pixel on the viewport
        pixel,
        (feature: Feature<Geometry>) => {
          return feature;
        }
      );

      if (feature) {
        const value = feature.get("ECO_NAME") || "&nbsp;";
        setFeatureInfo(value);
      } else {
        setFeatureInfo("");
      }

      if (feature !== highlight) {
        //console.log("feature", feature);
        //console.log("highlight", highlight);
        if (highlight) {
          // 이미 하이라이트 된 vector가 있으면 overlayer에서 삭제
          //console.log("remove");
          featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
          // 잡힌 vector가 있으면 overlayer에 추가
          //console.log("add");
          featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature; // 하이라이트 될 vector 다시 변수에 넣기
      }
    };

    map.on("pointermove", function (evt) {
      if (evt.dragging) {
        return;
      }
      const pixel = map.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel);
    });

    map.on("click", function (evt) {
      displayFeatureInfo(evt.pixel);
    });

    setMapObj({ map });

    return () => map.setTarget(null);
  }, []);

  return <Box id="map_cluster_01" h="560px" w="100%"></Box>;
};
