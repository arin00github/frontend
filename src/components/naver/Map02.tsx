import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useMapState, useMapDispatch } from "./MapProvider02";

type MapProps = naver.maps.Map;
type MarkerProps = naver.maps.Marker;
type newLayerProps = naver.maps.CadastralLayer;

export const Map02 = () => {
  const { map } = useMapState();

  const dispatch = useMapDispatch();

  //let HOME_PATH = window.HOME_PATH || '.';
  const MARKER_SPRITE_X_OFFSET = 29,
    MARKER_SPRITE_Y_OFFSET = 50;
  const MARKER_SPRITE_POSITION = {
    A0: [0, 0],
    B0: [MARKER_SPRITE_X_OFFSET, 0],
    C0: [MARKER_SPRITE_X_OFFSET * 2, 0],
    D0: [MARKER_SPRITE_X_OFFSET * 3, 0],
    E0: [MARKER_SPRITE_X_OFFSET * 4, 0],
    F0: [MARKER_SPRITE_X_OFFSET * 5, 0],
    G0: [MARKER_SPRITE_X_OFFSET * 6, 0],
    H0: [MARKER_SPRITE_X_OFFSET * 7, 0],
    I0: [MARKER_SPRITE_X_OFFSET * 8, 0],

    A1: [0, MARKER_SPRITE_Y_OFFSET],
    B1: [MARKER_SPRITE_X_OFFSET, MARKER_SPRITE_Y_OFFSET],
    C1: [MARKER_SPRITE_X_OFFSET * 2, MARKER_SPRITE_Y_OFFSET],
    D1: [MARKER_SPRITE_X_OFFSET * 3, MARKER_SPRITE_Y_OFFSET],
    E1: [MARKER_SPRITE_X_OFFSET * 4, MARKER_SPRITE_Y_OFFSET],
    F1: [MARKER_SPRITE_X_OFFSET * 5, MARKER_SPRITE_Y_OFFSET],
    G1: [MARKER_SPRITE_X_OFFSET * 6, MARKER_SPRITE_Y_OFFSET],
    H1: [MARKER_SPRITE_X_OFFSET * 7, MARKER_SPRITE_Y_OFFSET],
    I1: [MARKER_SPRITE_X_OFFSET * 8, MARKER_SPRITE_Y_OFFSET],

    A2: [0, MARKER_SPRITE_Y_OFFSET * 2],
    B2: [MARKER_SPRITE_X_OFFSET, MARKER_SPRITE_Y_OFFSET * 2],
    C2: [MARKER_SPRITE_X_OFFSET * 2, MARKER_SPRITE_Y_OFFSET * 2],
    D2: [MARKER_SPRITE_X_OFFSET * 3, MARKER_SPRITE_Y_OFFSET * 2],
    E2: [MARKER_SPRITE_X_OFFSET * 4, MARKER_SPRITE_Y_OFFSET * 2],
    F2: [MARKER_SPRITE_X_OFFSET * 5, MARKER_SPRITE_Y_OFFSET * 2],
    G2: [MARKER_SPRITE_X_OFFSET * 6, MARKER_SPRITE_Y_OFFSET * 2],
    H2: [MARKER_SPRITE_X_OFFSET * 7, MARKER_SPRITE_Y_OFFSET * 2],
    I2: [MARKER_SPRITE_X_OFFSET * 8, MARKER_SPRITE_Y_OFFSET * 2],
  };

  let mapObject: MapProps;
  const markers: any[] = [];
  const initMap = () => {
    mapObject = new naver.maps.Map("naver_map02", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });

    dispatch({ type: "CHANGE_MAP", map: mapObject });
  };

  //let bounds = mapObject.getBounds();
  //let southWest = bounds

  // const makeArray = () => {
  //     for (let key in MARKER_SPRITE_POSITION){

  //     }
  // }

  const displayData = () => {
    const bounds = map.getBounds();
    console.log("bounds", bounds.getMax().x, bounds.getMin().x);
  };

  //   const controlMarker = () => {
  //     naver.maps.Event.addListener(mapObject, "idle", function () {
  //       updateMarker(mapObject, markers);
  //     });
  //   };

  //   function updateMarker(mapUnit: MapProps, markers: MarkerProps[]) {
  //     const mapBounds = mapUnit.getBounds();
  //     let markerUnit, position;

  //     for (let i = 0; i < markers.length; i++) {
  //       markerUnit = markers[i];
  //       position = markerUnit.getPosition();

  //       if (mapBounds.hasPoint(position)) {
  //         showMarker(mapUnit, markerUnit);
  //       } else {
  //         hideMarker(mapUnit, markerUnit);
  //       }
  //     }
  //   }

  function showMarker(mapUnit: MapProps, marker: MarkerProps) {
    if (marker.getMap()) return;
    marker.setMap(mapUnit);
  }

  function hideMarker(mapUnit: MapProps, marker: MarkerProps) {
    if (!marker.getMap()) return;
    marker.setMap(null);
  }

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (map !== null) {
      displayData();
    }
  }, [map]);

  return <Box id="naver_map02" w="100%" h="560px"></Box>;
};
