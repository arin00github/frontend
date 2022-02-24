import React, { createContext } from "react";
import { Map as OlMap, View } from "ol";

const MapContext = createContext<{ map: OlMap }>({ map: null });

export default MapContext;
