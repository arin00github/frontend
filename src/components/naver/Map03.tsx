import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { useMapDispatch, useMapState } from "./MapProvider03";
//import dataArray from "Data/naver03.json";

export function Map03() {
  const [dataList, setDataList] = useState(null);

  const { map } = useMapState();

  const dispatch = useMapDispatch();

  let mapObject;
  let markerBox;
  let semaphore = false;

  function initMap() {
    mapObject = new naver.maps.Map("naver_map03", {
      zoom: 13,
      minZoom: 6,
      center: new naver.maps.LatLng(37.5666805, 126.9784147),
      mapTypeId: naver.maps.MapTypeId.HYBRID,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.LEFT_BOTTOM,
      },
      disableKineticPan: false,
    });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
  }

  function initOption() {
    const miniBox = document.getElementById("mini_map");
    naver.maps.Event.once(map, "init", function () {
      map.setOptions({
        mapTypeControl: true,
        scaleControl: false,
        logoControl: false,
      });

      //console.log(map.controls[naver.maps.Position.BOTTOM_RIGHT]);

      map.controls[naver.maps.Position.BOTTOM_RIGHT].push(miniBox);
      map.setOptions({
        scaleControl: true,
        logoControl: true,
      });
      const minimap = new naver.maps.Map("minimap", {
        //미니 맵 지도를 생성합니다.
        bounds: map.getBounds(),
        scrollWheel: false,
        scaleControl: false,
        mapDataControl: false,
        logoControl: false,
      });

      naver.maps.Event.addListener(map, "bounds_changed", function (bounds) {
        if (semaphore) return;
        minimap.fitBounds(bounds);
      });

      naver.maps.Event.addListener(
        map,
        "mapTypeId_changed",
        function (mapTypeId: any) {
          const toTypes: any = {
            normal: "hybrid",
            terrain: "satellite",
            satellite: "terrain",
            hybrid: "normal",
          };

          minimap.setMapTypeId(toTypes[mapTypeId]);
        }
      );

      naver.maps.Event.addListener(minimap, "drag", function () {
        semaphore = true;
        map.panTo(minimap.getCenter(), {
          easing: "",
        });
        naver.maps.Event.once(map, "idle", function () {
          semaphore = false;
        });
      });
    });
  }
  useEffect(() => {
    initMap();
    //setDataList(dataArray.searchResult.accidentDeath);
  }, []);

  useEffect(() => {
    if (map !== null) {
      initOption();
    }
  }, [map]);

  return (
    <>
      <Box w="1400px" h="680px" id="naver_map03" pos="relative">
        <Box
          id="mini_map"
          w="240px"
          h="240px"
          pos="absolute"
          bottom={0}
          right={0}
          zIndex={1000}
        ></Box>
      </Box>
    </>
  );
}
