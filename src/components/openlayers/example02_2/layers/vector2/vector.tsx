import React, { useEffect, useState } from "react";
import { MapBrowserEvent, Map } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import GeoJSON from "ol/format/GeoJSON";
import { useMapState } from "../../context";
import { Geometry } from "ol/geom";

type TSource = VectorSource<Geometry>;
type TLayer = VectorLayer<TSource>;

function VectorLayerComponent(props: { map: Map }): any {
  const [featureInfo, setFeatureInfo] = useState<Feature<Geometry>>(null);
  let source: TSource = null;
  let layer: TLayer = null;
  let featureOverlay: TLayer = null;

  const style = new Style({
    fill: new Fill({
      color: "#eeeeee",
    }),
  });
  useEffect(() => {
    source = new VectorSource({
      url: "https://openlayers.org/data/vector/ecoregions.json",
      format: new GeoJSON(),
    });
    layer = new VectorLayer({
      source: source,
      style: function (feature) {
        const color = feature.get("COLOR") || "#eeeeee";
        style.getFill().setColor(color);
        return style;
      },
    });
    featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: props.map,
      style: new Style({
        stroke: new Stroke({
          color: "rgba(255, 255, 255, 0.7)",
          width: 2,
        }),
      }),
    });

    props.map.addLayer(layer);
    props.map.on("pointermove", onMapHover);
  }, []);

  let highlight: Feature<Geometry>;

  const onMapHover = (event: MapBrowserEvent<UIEvent>) => {
    if (event.dragging) {
      return;
    }
    const pixel = props.map.getEventPixel(event.originalEvent);
    displayFeatureInfo(pixel);
  };

  function displayFeatureInfo(pixel: any) {
    const feature: any = props.map.forEachFeatureAtPixel(pixel, (feature) => {
      return feature;
    });

    if (feature) {
      const value: Feature<Geometry> = feature.get("ECO_NAME") || "&nbsp;";
      setFeatureInfo(value);
    } else {
      setFeatureInfo(null);
    }

    if (feature !== highlight) {
      if (highlight) {
        featureOverlay.getSource().removeFeature(highlight);
      }
      if (feature) {
        featureOverlay.getSource().addFeature(feature);
      }
      highlight = feature;
    }
  }

  return null;
}

export const VectorLayerWithContext = () => {
  const { map } = useMapState();

  return <VectorLayerComponent map={map} />;
};
