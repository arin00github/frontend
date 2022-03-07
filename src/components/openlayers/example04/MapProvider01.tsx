import React, { createContext, useContext, useMemo, useReducer } from "react";
import Map from "ol/Map";
import View from "ol/View";
import "ol/ol.css";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { getPointResolution, get as getProjection, transform } from "ol/proj";
import OSM from "ol/source/OSM";

import { useEffect } from "react";
import { useState } from "react";
import { MapContext01 } from "./MapContext01";
import { ScaleLine, defaults as defaultControls } from "ol/control";

interface IValue {
  map: Map;
  value: string;
}

const initialValue: IValue = {
  map: null,
  value: "EPSG:3857",
};

function mapReducer(state: any, action: any) {
  switch (action.type) {
    case "CHANGE_INPUT":
      console.log("action", action);
      return { ...state, value: action.value };
    case "CHANGE_MAP":
      console.log("map action", action);
      return { ...state, map: action.map };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}
const mapStateContext = createContext<IValue>(null);
const mapDispatchContext = createContext(null);

export const MapProvider01 = ({ children }: any) => {
  const [state, dispatch] = useReducer(mapReducer, initialValue);

  console.log("state", state);

  return (
    <mapStateContext.Provider value={state}>
      <mapDispatchContext.Provider value={dispatch}>
        {children}
      </mapDispatchContext.Provider>
    </mapStateContext.Provider>
  );
};

export function useMapState() {
  const context = useContext(mapStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useMapDispatch() {
  const context = useContext(mapDispatchContext);
  //console.log("context", context);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
