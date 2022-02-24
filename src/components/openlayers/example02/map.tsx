import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import TileLayer from "ol/layer/Tile";
import { VectorLayer } from "./layers";
import "ol/ol.css";
import { IMapContext, IMapState, TMapProps } from "./map-types";
import { Box } from "@chakra-ui/react";

export const MapContext = React.createContext<IMapContext | void>(undefined);

export class MapComponent extends React.PureComponent<TMapProps, IMapState> {
  private mapDivRef: React.RefObject<HTMLDivElement>;
  state: IMapState = {};

  constructor(props: TMapProps) {
    super(props);
    this.mapDivRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount(): void {
    if (!this.mapDivRef.current) {
      return;
    }

    const map = new Map({
      target: this.mapDivRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
    });

    const mapContext: IMapContext = { map };
    this.setState({
      mapContext: mapContext,
    });
  }

  render(): React.ReactNode {
    return (
      <Box ref={this.mapDivRef} h="450px" w="100%">
        {this.state.mapContext && (
          <MapContext.Provider value={this.state.mapContext}>
            <VectorLayer />
          </MapContext.Provider>
        )}
      </Box>
    );
  }
}
