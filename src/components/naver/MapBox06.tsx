import React from "react";
import { MapProvider06 } from "./MapProvider06";
import { Map06 } from "./Map06";

interface IMapBox06 {
  selectedReg: { code: string; center: any };
  handleSelect: (code: string) => void;
}

export default function MapBox05({ handleSelect, selectedReg }: IMapBox06) {
  return (
    <MapProvider06>
      <Map06
        selectedReg={selectedReg}
        handleSelect={(code: string) => {
          handleSelect(code);
        }}
      />
    </MapProvider06>
  );
}
