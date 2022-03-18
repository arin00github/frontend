import React, { useContext, useEffect } from "react";
import { MapProvider02 } from "./MapProvider02";
import { Map02 } from "./map02";

export const MapBox02 = () => {
  //const { map1 } = useContext(MapContext01);

  const RenderMapbox02 = () => {
    console.log("render map3");
    return <Map02 />;
  };

  return (
    <>
      <MapProvider02>{RenderMapbox02()}</MapProvider02>
    </>
  );
};
