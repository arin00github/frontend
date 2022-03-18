import React, { createContext } from "react";
import { ReactNode, useEffect, useState } from "react";
import { Map as OlMap, View } from "ol";
import { defaults as defaultContorls } from "ol/control";
import "ol/ol.css";
import { OSM } from "ol/source";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat, get as getProjection } from "ol/proj";
import MapContext from "./MapContext";

type MapProps = {
  children: ReactNode;
};

const MapProvider = ({ children }: MapProps) => {
  const [mapObj, setMapObj] = useState<OlMap>(null);

  //const MapContext = createContext<{ map: OlMap }>({ map: null });

  const handleChangeMap = (mapValue: OlMap) => {
    setMapObj(mapValue);
  };

  const providerValue = {
    map: mapObj,
    onChangeMap: handleChangeMap,
  };

  useEffect(() => {
    const map = new OlMap({
      controls: defaultContorls({ zoom: false, rotate: false }).extend([]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: "map",
      view: new View({
        projection: getProjection("EPSG:3857"),
        center: fromLonLat(
          [127.9745613, 37.3236563],
          getProjection("EPSG:3857")
        ),
        zoom: 15,
      }),
    });
    setMapObj(map);
    return () => map.setTarget(undefined);
  }, []);

  return (
    <MapContext.Provider value={providerValue}>{children}</MapContext.Provider>
  );
};

export default MapProvider;
