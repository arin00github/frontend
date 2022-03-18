import React, { createContext } from "react";
import { Map as OlMap, View } from "ol";

const MapContext = createContext<{
  map: OlMap;
  onChangeMap: (map: OlMap) => void;
}>({
  map: null,
  onChangeMap: () => {
    return null;
  },
});

export default MapContext;
