import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useMapDispatch, useMapState } from "./MapProvider04";
//import dataArray from "Data/naver03.json";

export function Map04() {
  const [dataList, setDataList] = useState(null);

  const { map } = useMapState();

  const dispatch = useMapDispatch();

  let mapObject;
  let contentEl: HTMLDivElement;

  function initMap() {
    mapObject = new naver.maps.Map("naver_map04", {
      zoom: 6,
      center: new naver.maps.LatLng(36.2253017, 127.6460516),
      zoomControl: true,
      padding: { top: 100 },
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
  }

  function initOption() {
    contentEl = document.createElement("div");
    contentEl.classList.add("iw_inner");
    contentEl.style.width = "240px";
    contentEl.style.height = "180px";
    contentEl.style.position = "absolute";
    contentEl.style.top = "0";
    contentEl.style.right = "0";
    contentEl.style.background = "#ffffff";
    contentEl.style.zIndex = "100";
    map.getElement().appendChild(contentEl);
    console.log(map.getElement());

    const titleEl = document.createElement("h3");
    titleEl.innerText = "Map State";

    const zoomEl = document.createElement("p");

    const centerEl = document.createElement("p");

    contentEl.appendChild(titleEl);
    contentEl.appendChild(zoomEl);
    contentEl.appendChild(centerEl);

    naver.maps.Event.addListener(map, "zoom_changed", function (zoom) {
      zoomEl.innerText = `zoom : ${zoom}`;
    });

    naver.maps.Event.addListener(map, "bounds_changed", function (bounds) {
      centerEl.innerText = `bounds : ${bounds.toString()}`;
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
      <Box w="1400px" h="680px" id="naver_map04" pos="relative">
        {/* <Box w="240px" h="160px" pos="absolute" top={0} left={0}>
          naver api
        </Box> */}
      </Box>
    </>
  );
}
