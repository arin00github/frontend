import React, { useMemo } from "react";
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

export const MapProvider01 = ({ children }: any) => {
  const [projOption, setProjOption] = useState<string>("EPSG:3857");
  const [mapObj, setMapObj] = useState<Map>(null);

  //const viewProjSelect: any = document.getElementById("view-projection");
  //const projection = getProjection(viewProjSelect.value);

  const handleMap01 = (map: Map) => {
    setMapObj(map);
  };
  const handleProjection = (map: string) => {
    setProjOption(map);
  };

  const value = useMemo(() => {
    return {
      map1: mapObj,
      setMap1: handleMap01,
      projValue: projOption,
      setProjValue: handleProjection,
    };
  }, [projOption]);

  useEffect(() => {
    console.log("provider", projOption);
    if (projOption !== undefined && projOption !== null) {
      const projection = projOption;

      const scaleControl = new ScaleLine({
        units: "metric",
        bar: true,
        steps: 4,
        text: true,
        minWidth: 140,
      });

      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: "map_projection_01",
        view: new View({
          center: transform([0, 52], "EPSG:4326", projection),
          zoom: 6,
          projection: projection,
        }),
      });

      setMapObj(map);
    }

    return () => {
      return null;
    };
  }, []);

  return (
    <MapContext01.Provider value={value}>{children}</MapContext01.Provider>
  );
};
