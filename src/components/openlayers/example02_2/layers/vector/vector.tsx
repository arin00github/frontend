import React, { useEffect, useState } from "react";
import { MapBrowserEvent } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { useMapState } from "../../context";
import { Geometry } from "ol/geom";

type TSource = VectorSource<Geometry>;
type TLayer = VectorLayer<TSource>;

function VectorLayerComponent(props: any): any {
  let source: TSource = null;
  let layer: TLayer = null;
  // const [layer, setLayer] = useState<TLayer>(null);
  // const [source, setSource] = useState<TSource>(null);

  useEffect(() => {
    source = new VectorSource({
      features: undefined,
    });
    layer = new VectorLayer({
      source: source,
    });

    props.map.addLayer(layer);
    props.map.on("singleclick", onMapClick);
  }, []);

  const onMapClick = (event: MapBrowserEvent<UIEvent>) => {
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
    //source.clear(); //undefined 값만 있던 내용을 제거.
    source.addFeatures([featureToAdd]); //새로 생성한 Feature를 추가
  };

  return null;
}

export const VectorLayerWithContext = () => {
  const { map } = useMapState();

  return (
    // <mapStateContext.Consumer>
    //   {(context) => {
    //     return <VectorLayerComponent map={map} />;
    //   }}
    // </mapStateContext.Consumer>
    <VectorLayerComponent map={map} />
  );
};
