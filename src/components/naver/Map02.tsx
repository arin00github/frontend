import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useMapState, useMapDispatch } from "./MapProvider02";
import {
  MapProps,
  MarkerProps,
  InfoWindowProps,
  PositionProps,
} from "./Naver_map";
import MarkerOverlay from "./MarkerCluster";
import $ from "jquery";

export const Map02 = () => {
  const { map } = useMapState();

  const dispatch = useMapDispatch();
  const MARKER_HIGHLIGHT_ICON_URL = "../../assets/images/marker_H.png";
  const MARKER_ICON_URL = "../../assets/images/marker_C.png";

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

  const recognizer = new MarkerOverlay(mapObject, {
    highlightRect: false,
    tolerance: 5,
  });

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
          url: MARKER_ICON_URL,
          size: new naver.maps.Size(24, 37),
          anchor: new naver.maps.Point(12, 37),
        },
        shape: {
          coords: [
            11, 0, 9, 0, 6, 1, 4, 2, 2, 4, 0, 8, 0, 12, 1, 14, 2, 16, 5, 19, 5,
            20, 6, 23, 8, 26, 9, 30, 9, 34, 13, 34, 13, 30, 14, 26, 16, 23, 17,
            20, 17, 19, 20, 16, 21, 14, 22, 12, 22, 12, 22, 8, 20, 4, 18, 2, 16,
            1, 13, 0,
          ],
          type: "poly",
        },
        zIndex: 100,
      });

      const contentString =
        '<div style="width:150px;text-align:center;padding:10px;">The Letter is <b>"' +
        key.substr(0, 1) +
        '"</b></div>';

      // const infoWindow = new naver.maps.InfoWindow({
      //   content: contentString,
      //   borderWidth: 1,
      //   borderColor: "#0475f4",
      //   anchorSize: new naver.maps.Size(10, 10),
      //   anchorSkew: false,
      // });
      //infoWindows.push(infoWindow);
      markers.push(marker);

      naver.maps.Event.addListener(marker, "mouseover", function (e) {
        highlightMarker(e.overlay);
      });
      naver.maps.Event.addListener(marker, "mouseout", function (e) {
        unhighlightMarker(e.overlay);
      });
      naver.maps.Event.addListener(marker, "click", function (e) {
        const m = e.overlay;

        //alert(m.title);
      });

      recognizer.add(marker);
    }
  }
  //console.log("recognizer", recognizer);
  function updateOverlay() {
    recognizer.setMap(map);
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
  function highlightMarker(marker: MarkerProps) {
    const icon: any = marker.getIcon();

    if (icon.url !== MARKER_HIGHLIGHT_ICON_URL) {
      icon.url = MARKER_HIGHLIGHT_ICON_URL;
      marker.setIcon(icon);
    }

    marker.setZIndex(1000);
  }

  function unhighlightMarker(marker: MarkerProps) {
    const icon: any = marker.getIcon();

    if (icon.url === MARKER_HIGHLIGHT_ICON_URL) {
      icon.url = MARKER_ICON_URL;
      marker.setIcon(icon);
    }

    marker.setZIndex(100);
  }
  let overlapCoverMarker: any = null;
  function recognizerEvent() {
    naver.maps.Event.addListener(recognizer, "overlap", function (list) {
      if (overlapCoverMarker) {
        unhighlightMarker(overlapCoverMarker);
      }
      overlapCoverMarker = list[0].marker;
      naver.maps.Event.once(overlapCoverMarker, "mouseout", function () {
        highlightMarker(overlapCoverMarker);
      });
    });
    naver.maps.Event.addListener(recognizer, "clickItem", function (e) {
      recognizer.hide();

      if (overlapCoverMarker) {
        unhighlightMarker(overlapCoverMarker);

        overlapCoverMarker = null;
      }
    });
    console.log(overlapCoverMarker);
  }

  function updateMarker(mapUnit: MapProps, markersArray: MarkerProps[]) {
    const mapBounds = mapUnit.getBounds();
    //console.log(mapBounds);
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
      controlMarker();
      regitserEvent();
      updateOverlay();
      //excuteCluster();

      if (recognizer !== undefined && recognizer !== null) {
        console.log("confirm", recognizer);
        displayData();
        recognizerEvent();
      }
    }
  }, [map, recognizer]);

  return (
    <>
      <Box id="naver_map02" w="1200px" h="560px"></Box>
    </>
  );
};
