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

//POINT Function 컴포넌트가 아니기 때문에 만들수 있는 형식
class VectorLayerComponent extends React.PureComponent<TVectorLayerComprops> {
  layer: VectorLayer<TSource>;
  source: TSource;

  componentDidMount(): void {
    console.log("layerCom componentDidMount");
    console.log(this.props);
    this.source = new VectorSource({
      features: undefined,
    });

    this.layer = new VectorLayer({
      source: this.source,
    });

    //레이어 추가함.
    this.props.map.addLayer(this.layer);

    //만약 클릭하면 onMapClick을 실행해라.
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
    this.source.clear(); //undefined 값만 있던 내용을 제거.
    this.source.addFeatures([featureToAdd]); //새로 생성한 Feature를 추가
  };

  render(): React.ReactNode {
    return null;
  }
}

export const VectorLayerWithContext = (props: TVectorLayerProps) => {
  console.log("vectorContext props", props);
  return (
    <MapContext.Consumer>
      {
        //NO. mapContext가 있으면 렌더링 함
      }
      {(mapContext: IMapContext | void) => {
        if (mapContext) {
          return <VectorLayerComponent {...props} map={mapContext.map} />;
        }
      }}
    </MapContext.Consumer>
  );
};
