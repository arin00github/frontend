import React from "react";
import { MapBrowserEvent } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { MapComponent, MapContext } from "../../map";
import { IMapContext } from "../../map-types";
import { TVectorLayerComprops, TVectorLayerProps } from "./vector-types";
import { Geometry } from "ol/geom";

type TSource = VectorSource<Geometry>;

class VectorLayerComponent extends React.PureComponent<TVectorLayerComprops> {
  layer: VectorLayer<TSource>;
  source: TSource;

  componentDidMount(): void {
    this.source = new VectorSource({
      features: undefined,
    });

    this.layer = new VectorLayer({
      source: this.source,
    });

    this.props.map.addLayer(this.layer);
    this.props.map.on("singleclick", this.onMapClick);
  }

  onMapClick = (event: MapBrowserEvent<UIEvent>) => {
    const featureToAdd = new Feature({
      geometry: new Point(event.coordinate),
    });

    const style = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: "red" }),
        stroke: new Stroke({
          color: [0, 0, 0],
          width: 2,
        }),
      }),
    });

    featureToAdd.setStyle(style);
    this.source.clear();
    this.source.addFeatures([featureToAdd]);
  };

  render(): React.ReactNode {
    return null;
  }
}

export const VectorLayerWithContext = (props: TVectorLayerProps) => {
  console.log("vectorContext props", props);
  return (
    <MapContext.Consumer>
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <VectorLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
