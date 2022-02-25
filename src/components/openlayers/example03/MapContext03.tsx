import React, { createContext } from "react";
import { Map as OlMap, View } from "ol";

const MapContext = createContext<{ map3: OlMap }>({ map3: null });

export default MapContext;
