import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Map as OlMap, View } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { ScaleLine } from "ol/control";
import { getPointResolution, get as getProjection, transform } from "ol/proj";

export const MapContext01 = createContext<{
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

export const MapProvider01 = ({ children }: any) => {
  const [projOption, setProjOption] = useState<string>("EPSG:3857");
  const [mapObj, setMapObj] = useState<OlMap>(null);

  //const viewProjSelect: any = document.getElementById("view-projection");
  //const projection = getProjection(viewProjSelect.value);

  const handleMap01 = (map: OlMap) => {
    setMapObj(map);
  };
  const handleProjection = (proj: string) => {
    console.log("check", proj);
    setProjOption(proj);
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

      const map = new OlMap({
        layers: [],
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
  }, [projOption]);

  return (
    <MapContext01.Provider value={value}>{children}</MapContext01.Provider>
  );
};
