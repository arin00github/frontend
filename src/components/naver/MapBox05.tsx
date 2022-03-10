import React from "react";
import { MapProvider05 } from "./MapProvider05";
import { Map05 } from "./Map05";

interface IMapBox05 {
  handleSelect: (code: string, center: any) => void;
}

export default function MapBox05({ handleSelect }: IMapBox05) {
  return (
    <MapProvider05>
      <Map05
        handleSelect={(code: string, center: any) => {
          handleSelect(code, center);
        }}
      />
    </MapProvider05>
  );
}
