import React from "react";
import { MapProvider01 } from "./MapProvider01";
import { Map01 } from "./Map01";

export default function MapBox01() {
  return (
    <MapProvider01>
      <Map01 />
    </MapProvider01>
  );
}
