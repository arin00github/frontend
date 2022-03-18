import React, { useContext, useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import TileLayer from "ol/layer/Tile";
import { VectorLayer } from "./layers";
import "ol/ol.css";
import { Box } from "@chakra-ui/react";
import {
  MapProvider,
  useMapState,
  useMapDispatch,
  MapConsumer,
} from "./context";

export function MapComponent() {
  const { map } = useMapState();
  const dispatch = useMapDispatch();
  const mapDivRef = useRef<HTMLDivElement>(null);

  function draw(value: any) {
    console.log(value);
  }

  //NO. 1 map 컴포넌트시작 해서 new Map으로 지도 객체 생성
  useEffect(() => {
    if (!mapDivRef.current) {
      return;
    }
    const initMap = new Map({
      target: mapDivRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
    });
    dispatch({ type: "CHANGE_MAP", map: initMap });
  }, []);

  useEffect(() => {
    if (map !== null) {
      draw(map);
    }
  }, [map]);

  return (
    <Box ref={mapDivRef} h="560px" w="100%">
      {
        //NO. this.state에 저장한 내용을 Provider 의 value로 전달
        // 만약 mapContext 값이 있으면 Provider 컴포넌트를 렌더링함
        // Provider 컴포넌트 안에 VectorLayer 가 있음
      }
      {map !== null && <VectorLayer />}
    </Box>
  );
}
