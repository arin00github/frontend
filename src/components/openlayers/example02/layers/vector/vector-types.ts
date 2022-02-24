import Map from "ol/Map";
import Feature from "ol/Feature";
import { Geometry } from "ol/geom";

export type TVectorLayerProps = {};

export type TVectorLayerComprops = TVectorLayerProps & {
  map: Map;
  features?: Feature<Geometry>[];
};
