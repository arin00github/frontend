import React, { useContext, useEffect } from "react";
import { MapProvider04 } from "./MapProvider04";
import { Map04 } from "./map04";

export const MapBox04 = () => {
  //const { map1 } = useContext(MapContext01);

  const RenderMapbox04 = () => {
    console.log("render map3");
    return <Map04 />;
  };

  //   useEffect(() => {
  //     console.log("mapbox", map1);
  //     if (map1 !== null && map1 !== undefined) {
  //       console.log("mapbox", map1);
  //     }
  //   }, [map1]);
  return (
    <>
      <MapProvider04>{RenderMapbox04()}</MapProvider04>
    </>
  );
};
