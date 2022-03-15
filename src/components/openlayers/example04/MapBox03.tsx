import React, { useContext, useEffect } from "react";
import { MapProvider03 } from "./MapProvider03";
import { Map03 } from "./Map03";

export const MapBox03 = () => {
  //const { map1 } = useContext(MapContext01);

  const RenderMapbox03 = () => {
    console.log("render map3");
    return <Map03 />;
  };

  //   useEffect(() => {
  //     console.log("mapbox", map1);
  //     if (map1 !== null && map1 !== undefined) {
  //       console.log("mapbox", map1);
  //     }
  //   }, [map1]);
  return (
    <>
      <MapProvider03>{RenderMapbox03()}</MapProvider03>
    </>
  );
};
