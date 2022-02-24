import Map from "ol/Map";

export type TMapProps = {};
export type IMapState = {
  mapContext?: IMapContext;
};
export interface IMapContext {
  map: Map;
}
