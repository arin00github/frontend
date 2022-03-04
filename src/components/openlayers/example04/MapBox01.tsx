import React, { useContext, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { MapProvider01 } from "./MapProvider01";
import { Map01 } from "./Map01";
import { MapContext01 } from "./MapContext01";
import RenderFeature from "ol/render/Feature";

export const MapBox01 = () => {
  // provider컴포넌트가 있는 곳에서는 context데이터를 불러올 수가 없다.
  // 그 아래 컴포넌트에 있는 데이터여야 한다.

  //const { map1 } = useContext(MapContext01);

  const RenderMapbox01 = () => {
    console.log("render map");
    return <Map01 />;
  };

  //   useEffect(() => {
  //     console.log("mapbox", map1);
  //     if (map1 !== null && map1 !== undefined) {
  //       console.log("mapbox", map1);
  //     }
  //   }, [map1]);
  return (
    <>
      <MapProvider01>{RenderMapbox01()}</MapProvider01>
    </>
  );
};
