import React, { useEffect, useState } from "react";
import "ol/ol.css";
import { useMapDispatch, useMapState } from "./MapProvider04";
import { useDispatch } from "react-redux";
import {
  Box,
  Flex,
  Text,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import Map from "ol/Map";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import View from "ol/View";
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  Stroke,
  Style,
  Text as TextStyle,
} from "ol/style";
import { Cluster, OSM, Vector as VectorSource, XYZ } from "ol/source";
import { LineString, Point, Polygon } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import Geometry from "ol/geom/Geometry";
import geoJsonData from "../../../service/data/openlayers/phtovoltaic.json";
import { boundingExtent } from "ol/extent";

export function Map04({ children }: any) {
  const dispatch = useDispatch();

  const { map, clusterItem } = useMapState();

  const [distance, setDistance] = useState<number>(40);

  const [minDistance, setMinDistance] = useState<number>(20);

  const raster = new TileLayer({
    source: new OSM(),
  });

  const styleCache: any = {};
  let clusterSource: Cluster = null;
  let clusters: VectorLayer<VectorSource<any>> = null;

  let mapObject: Map = null;

  const distanceHandler = function (value: number) {
    clusterItem.setDistance(value);
  };

  const minDistanceHandler = function (value: number) {
    clusterItem.setMinDistance(value);
  };

  const count = 2000;
  const features = new Array(count);
  const e = 4500000;
  for (let i = 0; i < count; i++) {
    const lat = 2 * e * Math.random() - e;
    const lng = 2 * e * Math.random() - e;
    const coordinates = [lat, lng];
    features[i] = new Feature(new Point(coordinates));
  }
  const source = new VectorSource({
    features: features,
  });

  function initMap() {
    mapObject = new Map({
      layers: [raster],
      target: "map_cluster_04",
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
    });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
  }

  function initCluster(param1: number, param2: number) {
    console.log("initCluster");
    clusterSource = new Cluster({
      distance: Number(param1),
      minDistance: Number(param2),
      source: source,
    });
    dispatch({ type: "CHANGE_CLUSTER", clusterItem: clusterSource });

    clusters = new VectorLayer({
      source: clusterSource,
      style: function (feature: any) {
        const size = feature.get("features").length;

        let featureStyle = styleCache[size];
        if (!featureStyle) {
          featureStyle = new Style({
            image: new CircleStyle({
              radius: 10,
              stroke: new Stroke({ color: "#fff" }),
              fill: new Fill({
                color: "#3399cc",
              }),
            }),
            text: new TextStyle({
              text: size.toString(),
              fill: new Fill({
                color: "#fff",
              }),
            }),
          });
          styleCache[size] = featureStyle;
        }
        return featureStyle;
      },
    });
    map.addLayer(clusters);
  }

  // map.on("click", (e) => {
  //   clusters.getFeatures(e.pixel).then((clickedFeatures) => {
  //     if (clickedFeatures.length) {
  //       const features = clickedFeatures[0].get("features");
  //       if (features.length > 1) {
  //         const extent = boundingExtent(
  //           features.map((r: any) => r.getGeometry().getCoordinate())
  //         );
  //         map
  //           .getView()
  //           .fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
  //       }
  //     }
  //   });
  // });

  useEffect(() => {
    console.log("useEffect1");
    initMap();
  }, []);

  useEffect(() => {
    console.log("useEffect2", map);
    if (map !== null) {
      console.log("useEffect2 again", map);
      initCluster(distance, minDistance);
    }
  }, [map, distance, minDistance]);

  return (
    <>
      <Box id="map_cluster_04" h="560px" w="100%"></Box>
      <Box>
        <Flex h="60px" lineHeight="60px">
          <Text w="150px" mr="10px">
            Cluster distance
          </Text>
          <Slider
            aria-label="distance"
            defaultValue={40}
            value={distance}
            onChange={(val) => {
              distanceHandler(val);
              setDistance(val);
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
        <Flex h="60px" lineHeight="60px">
          <Text w="150px" mr="10px">
            Minimun distance
          </Text>
          <Slider
            aria-label="distance"
            defaultValue={20}
            value={minDistance}
            onChange={(val) => {
              setMinDistance(val);
              minDistanceHandler(val);
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
      </Box>
    </>
  );
}
