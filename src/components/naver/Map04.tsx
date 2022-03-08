import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useMapDispatch, useMapState } from "./MapProvider04";
//import dataArray from "Data/naver03.json";

export function Map04() {
  const [dataList, setDataList] = useState(null);

  const { map } = useMapState();

  const dispatch = useMapDispatch();

  let mapObject;
  let markerBox;

  function initMap() {
    mapObject = new naver.maps.Map("naver_map04", {
      zoom: 6,
      center: new naver.maps.LatLng(36.2253017, 127.6460516),
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
  }

  useEffect(() => {
    initMap();
    //setDataList(dataArray.searchResult.accidentDeath);
  }, []);

  useEffect(() => {
    if (map !== null) {
      //onLoadMarker();
    }
  }, [map]);

  return (
    <>
      <Box w="1200px" h="560px" id="naver_map04"></Box>
    </>
  );
}