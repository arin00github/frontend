import React, { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import Projection from "ol/proj/Projection";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import View from "ol/View";
import { ScaleLine, defaults as defaultControls } from "ol/control";
import {
  addCoordinateTransforms,
  addProjection,
  fromLonLat,
  transform,
} from "ol/proj";
import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useMapState } from "./MapProvider03";
import ImageLayer from "ol/layer/Image";
import { ImageWMS } from "ol/source";
import { register } from "ol/proj/proj4";

export function Map03({ children }: any) {
  const dispatch = useDispatch();

  const { map, value } = useMapState();

  const extent = [42000, 30000, 900000, 350000];

  const projection = new Projection({
    code: "EPSG:21781",
    units: "m",
  });

  const layers = [
    new TileLayer({
      source: new TileWMS({
        attributions:
          '© <a href="https://shop.swisstopo.admin.ch/en/products/maps/national/lk1000"' +
          'target="_blank">Pixelmap 1:1000000 / geo.admin.ch</a>',
        crossOrigin: "anonymous",
        params: {
          LAYERS: "ch.swisstopo.pixelkarte-farbe-pk1000.noscale",
          FORMAT: "image/jpeg",
        },
        url: "https://wms.geo.admin.ch/",
      }),
    }),
    new ImageLayer({
      source: new ImageWMS({
        attributions:
          '© <a href="https://www.hydrodaten.admin.ch/en/notes-on-the-flood-alert-maps.html"' +
          'target="_blank">Flood Alert / geo.admin.ch</a>',
        crossOrigin: "anonymous",
        params: { LAYERS: "ch.bafu.hydroweb-warnkarte_national" },
        serverType: "mapserver",
        url: "https://wms.geo.admin.ch/",
      }),
    }),
  ];
  function initMap() {
    const mapObject = new Map({
      controls: defaultControls().extend([new ScaleLine()]),
      layers: layers,
      target: "map_projection_03",
      view: new View({
        center: [660000, 190000],
        projection: projection,
        zoom: 9,
      }),
    });
    // setMapObj({ map3: map });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
  }

  useEffect(() => {
    console.log("initmap3");
    initMap();
  }, []);

  return <Box id="map_projection_03" h="450px" w="100%"></Box>;
}
