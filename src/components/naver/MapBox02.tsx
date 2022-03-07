import React from "react";
import { MapProvider02 } from "./MapProvider02";
import { Map02 } from "./Map02";

export default function MapBox02() {
  const renderMap = () => {
    return <Map02 />;
  };

  return <MapProvider02>{renderMap()}</MapProvider02>;
}
