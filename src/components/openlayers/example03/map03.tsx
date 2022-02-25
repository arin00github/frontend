import React, { useEffect, useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import "ol/ol.css";
import MVT from "ol/format/MVT";
import Map from "ol/Map";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import View from "ol/View";
import { Fill, Stroke, Style } from "ol/style";
import MapContext from "./MapContext03";

export function MapBox3({ children }: any) {
  const [type, setType] = useState<string>("singleSelect");

  const [mapObj, setMapObj] = useState<{ map3: Map }>({ map3: null });
  useEffect(() => {
    let selection: any = {};

    const country = new Style({
      stroke: new Stroke({
        color: "gray",
        width: 1,
      }),
      fill: new Fill({
        color: "rgba(20,20,20,0.9)",
      }),
    });

    const selectedCountry = new Style({
      stroke: new Stroke({
        color: "rgba(200,20,20,0.8)",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(200,20,20,0.4)",
      }),
    });

    const vtLayer = new VectorTileLayer({
      declutter: true,
      source: new VectorTileSource({
        maxZoom: 15,
        format: new MVT({
          idProperty: "ios_a3",
        }),
        url:
          "https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/" +
          "ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf",
      }),
      style: country,
    });

    const map = new Map({
      layers: [vtLayer],
      target: "map4",
      view: new View({
        center: [0, 0],
        zoom: 2,
        multiWorld: true,
      }),
    });

    const selectionLayer = new VectorTileLayer({
      map: map,
      renderMode: "vector",
      source: vtLayer.getSource(),
      style: function (feature) {
        if (feature.getId() in selection) {
          return selectedCountry;
        }
      },
    });
    setMapObj({ map3: map });

    map.on("click", function (event) {
      if (
        (type === "singleHover" && event.type !== "pointermove") ||
        (type !== "singleHover" && event.type === "pointermove")
      ) {
        return;
      }

      vtLayer.getFeatures(event.pixel).then((features) => {
        if (!features.length) {
          selection = {};
          selectionLayer.changed();
          return;
        }

        const feature = features[0];
        if (!feature) {
          return;
        }

        const fid = feature.getId();

        if (type.indexOf("singleSelect") === 0) {
          selection = {};
        }

        selection[fid] = feature;

        selectionLayer.changed();
      });
    });
  }, []);

  return <MapContext.Provider value={mapObj}>{children}</MapContext.Provider>;
}
