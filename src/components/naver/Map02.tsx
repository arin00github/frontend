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
  const MARKER_ICON_URL = "./img/marker.png";
  const MARKER_SPRITE_X_OFFSET = 29,
    MARKER_SPRITE_Y_OFFSET = 50;
  const MARKER_SPRITE_POSITION: any = {
    // A0: [0, 0],
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
      zoom: 11,
    });

    dispatch({ type: "CHANGE_MAP", map: mapObject });
  };

  //let bounds = mapObject.getBounds();
  //let southWest = bounds

  const makeOrigin = (key: string) => {
    return [MARKER_SPRITE_POSITION[key][0], MARKER_SPRITE_POSITION[key][1]];
  };

  const displayData = () => {
    console.log("map", map);
    const bounds = map.getBounds();
    const latSpan = bounds.getMax().x - bounds.getMin().x;
    const lngSpan = bounds.getMax().y - bounds.getMin().y;

    for (const key in MARKER_SPRITE_POSITION) {
      const position = new naver.maps.LatLng(
        bounds.getMin().y + lngSpan * Math.random(),
        bounds.getMin().x + latSpan * Math.random()
      );

      const originValue = makeOrigin(key);
      //console.log(originValue);

      const marker = new naver.maps.Marker({
        map: map,
        position: position,
        title: key,
        icon: {
          url: MARKER_ICON_URL,
          size: new naver.maps.Size(24, 37),
          anchor: new naver.maps.Point(12, 37),
          origin: new naver.maps.Point(originValue[0], originValue[1]),
        },
        zIndex: 100,
      });

      markers.push(marker);
    }
  };

  const controlMarker = () => {
    naver.maps.Event.addListener(map, "idle", function () {
      console.log("update");

      updateMarker(map, markers);
    });
  };

  function updateMarker(mapUnit: MapProps, markersArray: MarkerProps[]) {
    const mapBounds = mapUnit.getBounds();

    // const sw = new naver.maps.LatLng(
    //   mapBounds.getMin().y,
    //   mapBounds.getMin().x
    // );
    // const ne = new naver.maps.LatLng(
    //   mapBounds.getMax().y,
    //   mapBounds.getMax().x
    // );

    let markerUnit, position;

    for (let i = 0; i < markersArray.length; i++) {
      markerUnit = markersArray[i];
      position = markerUnit.getPosition();

      if (mapBounds.hasPoint(position)) {
        showMarker(mapUnit, markerUnit);
      } else {
        hideMarker(mapUnit, markerUnit);
      }
    }
    const filterPoints = markersArray.filter((point) => {
      const dotPosition = point.getPosition();
      return mapBounds.hasPoint(dotPosition);
    });
    console.log(filterPoints.length);
  }

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
      //console.log("markers", markers);
      controlMarker();
    }
  }, [map]);

  return <Box id="naver_map02" w="1200px" h="560px"></Box>;
};
