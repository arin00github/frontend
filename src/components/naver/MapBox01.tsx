import React from "react";
import { MapProvider01 } from "./MapProvider01";
import { Map01 } from "./Map01";

export default function MapBox01() {
  const renderMap = () => {
    return <Map01 />;
  };

  return <MapProvider01>{renderMap()}</MapProvider01>;
}
