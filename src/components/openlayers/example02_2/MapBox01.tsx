import React, { useContext, useEffect } from "react";
import { MapProvider } from "./context";
import { MapComponent } from "./map";

export const MapBox = () => {
  const RenderMapbox01 = () => {
    console.log("render map");
    return <MapComponent />;
  };

  return (
    <>
      <MapProvider>{RenderMapbox01()}</MapProvider>
    </>
  );
};
