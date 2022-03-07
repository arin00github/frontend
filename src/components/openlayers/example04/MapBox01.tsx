import React, { useContext, useEffect } from "react";
import { MapProvider01 } from "./MapProvider01";
import { Map01 } from "./Map01";

export const MapBox01 = () => {
  //const { map1 } = useContext(MapContext01);

  const RenderMapbox01 = () => {
    //console.log("render map");
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
