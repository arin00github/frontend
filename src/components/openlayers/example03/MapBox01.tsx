import React, { useContext, useEffect } from "react";
import { MapProvider01 } from "./MapProvider01";
import { Map01 } from "./map";

export const MapBox01 = () => {
  //const { map1 } = useContext(MapContext01);

  const RenderMapbox01 = () => {
    console.log("render map3");
    return <Map01 />;
  };

  return (
    <>
      <MapProvider01>{RenderMapbox01()}</MapProvider01>
    </>
  );
};
