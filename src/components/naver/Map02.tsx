import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useMapState, useMapDispatch } from "./MapProvider02";
import {
  MapProps,
  MarkerProps,
  InfoWindowProps,
  PositionProps,
} from "./Naver_map";

export const Map02 = () => {
  const { map } = useMapState();

  const dispatch = useMapDispatch();

  const MARKER_SPRITE_X_OFFSET = 29,
    MARKER_SPRITE_Y_OFFSET = 50;
  const MARKER_SPRITE_POSITION: any = {
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
  const markers: MarkerProps[] = [];
  const infoWindows: InfoWindowProps[] = [];
  function initMap() {
    mapObject = new naver.maps.Map("naver_map02", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 11,
    });

    dispatch({ type: "CHANGE_MAP", map: mapObject });
  }

  function displayData() {
    const bounds = map.getBounds();
    const latSpan = bounds.getMax().x - bounds.getMin().x;
    const lngSpan = bounds.getMax().y - bounds.getMin().y;

    for (const key in MARKER_SPRITE_POSITION) {
      const position = new naver.maps.LatLng(
        bounds.getMin().y + lngSpan * Math.random(),
        bounds.getMin().x + latSpan * Math.random()
      );

      const marker = new naver.maps.Marker({
        map: map,
        position: position,
        title: key,
        icon: {
          url: "../../assets/images/marker.png",
          anchor: new naver.maps.Point(12, 37),
        },
        zIndex: 100,
      });

      const contentString =
        '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' +
        key.substr(0, 1) +
        '"</b></div>';

      const infoWindow = new naver.maps.InfoWindow({
        content: contentString,
        borderWidth: 1,
        borderColor: "#0475f4",
        anchorSize: new naver.maps.Size(10, 10),
        anchorSkew: false,
      });

      markers.push(marker);
      infoWindows.push(infoWindow);
    }
  }

  function getClickHandler(seq: number) {
    return function () {
      const markerPoint = markers[seq];
      const infoWindow: naver.maps.InfoWindow = infoWindows[seq];

      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, markerPoint);
      }
    };
  }

  function regitserEvent() {
    for (let i = 0; i < markers.length; i++) {
      naver.maps.Event.addListener(markers[i], "click", getClickHandler(i));
    }
  }

  function updateMarker(mapUnit: MapProps, markersArray: MarkerProps[]) {
    const mapBounds = mapUnit.getBounds();
    let markerUnit: MarkerProps, position;

    for (let i = 0; i < markersArray.length; i++) {
      markerUnit = markersArray[i];
      position = markerUnit.getPosition();

      if (mapBounds.hasPoint(position)) {
        showMarker(mapUnit, markerUnit);
      } else {
        hideMarker(mapUnit, markerUnit);
      }
    }
  }

  function showMarker(mapUnit: MapProps, marker: MarkerProps) {
    if (marker.getMap()) return;
    marker.setMap(mapUnit);
  }

  function hideMarker(mapUnit: MapProps, marker: MarkerProps) {
    if (!marker.getMap()) return;
    marker.setMap(null);
  }

  function controlMarker() {
    naver.maps.Event.addListener(map, "idle", function () {
      updateMarker(map, markers);
    });
  }

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (map !== null) {
      displayData();
      controlMarker();
      regitserEvent();
    }
  }, [map]);

  return (
    <>
      <Box id="naver_map02" w="1200px" h="560px"></Box>
    </>
  );
};
