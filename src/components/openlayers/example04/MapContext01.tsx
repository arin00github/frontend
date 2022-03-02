import React, { createContext, Dispatch, SetStateAction } from "react";
import { Map as OlMap, View } from "ol";

const MapContext01 = createContext<{
  map1: OlMap;
  setMap1: Dispatch<SetStateAction<OlMap>>;
  projValue?: string;
  setProjValue?: Dispatch<SetStateAction<string>>;
}>({
  map1: null,
  setMap1: () => {
    return null;
  },
  projValue: null,
  setProjValue: () => {
    return null;
  },
});

export default MapContext01;
