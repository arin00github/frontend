import React, { useEffect, useState } from "react";
import "ol/ol.css";
import { useMapDispatch, useMapState } from "./MapProvider03";
import { useDispatch } from "react-redux";
import { Box } from "@chakra-ui/react";
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
  Text,
} from "ol/style";
import { Cluster, OSM, Vector as VectorSource, XYZ } from "ol/source";
import { LineString, Point, Polygon } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import Geometry from "ol/geom/Geometry";
import geoJsonData from "../../../service/data/openlayers/phtovoltaic.json";

export function Map03({ children }: any) {
  const dispatch = useDispatch();

  const { map, value } = useMapState();

  useEffect(() => {
    const circleDistanceMultiplier = 1;
    const circleFootSeparation = 28;
    const circleStartAngle = Math.PI / 2;

    const convexHullFill = new Fill({
      color: "rgba(255, 153, 0, 0.4)",
    });
    const convexHullStroke = new Stroke({
      color: "rgba(204, 85, 0, 1)",
      width: 1.5,
    });
    const outerCircleFill = new Fill({
      color: "rgba(255, 153, 102, 0.3)",
    });
    const innerCircleFill = new Fill({
      color: "rgba(255, 165, 0, 0.7)",
    });
    const textFill = new Fill({
      color: "#fff",
    });
    const textStroke = new Stroke({
      color: "rgba(0, 0, 0, 0.6)",
      width: 3,
    });
    const innerCircle = new CircleStyle({
      radius: 14,
      fill: innerCircleFill,
    });
    const outerCircle = new CircleStyle({
      radius: 20,
      fill: outerCircleFill,
    });
    const darkIcon = new Icon({
      src: "../../assets/images/marker_C.png",
    });

    const lightIcon = new Icon({
      src: "../../assets/images/marker_H.png",
    });

    function clusterMemberStyle(clusterMember: Feature<Geometry>) {
      return new Style({
        geometry: clusterMember.getGeometry(),
        image: clusterMember.get("LEISTUNG") > 5 ? darkIcon : lightIcon,
      });
    }
    let clickFeature: any, clickResolution: number;

    // function clusterCircleStyle(cluster: any, resolution: number) {
    //   if (cluster != clickFeature || resolution !== clickResolution) {
    //     return;
    //   }
    //   const clusterMembers = cluster.get("features");
    //   const centerCoordinates = cluster.getGeometry().getCoordinates();

    //   const callback = generatePointCircle(
    //     clusterMembers.length,
    //     centerCoordinates,
    //     resolution
    //   ).reduce((styles, coordinates, i) => {
    //     const point = new Point(coordinates);
    //     const line = new LineString([centerCoordinates, coordinates]);
    //     styles.unshift(new Style({ geometry: line, stroke: convexHullStroke }));
    //   });
    // }

    function generatePointCircle(
      count: number,
      clusterCenter: number[],
      resolution: number
    ) {
      const circumfenrence =
        circleDistanceMultiplier * circleFootSeparation * (2 + count);
      let legLength = circumfenrence / (Math.PI * 2);
      const angleStep = (Math.PI * 2) / count;
      const res = [];
      let angle: number;

      legLength = Math.max(legLength, 35) * resolution;

      for (let i = 0; i < count; ++i) {
        angle = circleStartAngle + i * angleStep;
        res.push([
          clusterCenter[0] + legLength * Math.cos(angle),
          clusterCenter[1] + legLength * Math.sin(angle),
        ]);
      }

      return res;
    }

    let hoverFeature: Feature<Geometry>;
    function clusterHullStyle(cluster: Feature<Geometry>) {
      console.log("hull", cluster);
      if (cluster !== hoverFeature) {
        return;
      }

      const originFeatures = cluster.get("features");
      const point = originFeatures.map((feature: any) =>
        feature.getGeometry().getCoordinates()
      );
      const newStyle = new Style({
        geometry: new Polygon(point),
        fill: convexHullFill,
        stroke: convexHullStroke,
      });

      return newStyle;
    }

    function clusterStyle(feature: Feature<Geometry>) {
      console.log("clusterStyle feature", feature);
      const size = feature.get("features").length;

      const innerCircleStyle = new Style({ image: outerCircle });
      const outerCircleStyle = new Style({
        image: innerCircle,
        text: size.toString(),
        fill: textFill,
        stroke: textStroke,
      });

      if (size > 1) {
        return [innerCircleStyle, outerCircleStyle];
      } else {
        const originalFeature = feature.get("features")[0];
        return clusterMemberStyle(originalFeature);
      }
    }

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geoJsonData),
      // url: "../../../service/data/openlayers/phtovoltaic.json",
    });

    const vectorstyle = new Style({
      fill: new Fill({
        color: "#eeeeee",
      }),
    });

    const clusterSource = new Cluster({
      attributions:
        'Data: <a href="https://www.data.gv.at/auftritte/?organisation=stadt-wien">Stadt Wien</a>',
      distance: 35,
      source: vectorSource,
    });

    const clusterHulls = new VectorLayer({
      source: clusterSource,
      style: clusterHullStyle,
    });

    // Layer displaying the clusters and individual features.
    const clusters = new VectorLayer({
      source: clusterSource,
      style: clusterStyle,
    });

    const raster = new TileLayer({
      source: new XYZ({
        // attributions:
        //   'Base map: <a target="_blank" href="https://basemap.at/">basemap.at</a>',
        url: "https://maps{1-4}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",
      }),
    });

    let mapObject: Map = null;

    const vectorLayer = new VectorLayer({
      background: "white",
      source: vectorSource,
      style: function (feature) {
        //console.log(feature);
        //const color = feature.get("COLOR") || "#eeeeee";
        vectorstyle.setStroke(new Stroke({ color: "black" }));
        return vectorstyle;
      },
      declutter: true,
    });

    mapObject = new Map({
      //layers: [raster, clusterHulls, clusters, clusterCircles],
      layers: [raster, clusters, vectorLayer],
      target: "map_cluster_03",
      view: new View({
        center: [0, 0],
        zoom: 2,
        maxZoom: 19,
        extent: [
          ...fromLonLat([16.1793, 48.1124]),
          ...fromLonLat([16.5559, 48.313]),
        ],
        showFullExtent: true,
      }),
    });

    // function makePolygon (){
    //   const features = vectorSource.getFeatures();
    //   features.forEach((feature) => {
    //     feature.g
    //   })
    // }

    mapObject.on("dblclick", (event) => {
      console.log("clusters", clusters);
      const features = vectorSource.getFeatures();
      // console.log("feature", features);
      features.forEach((feature: any, idx) => {
        if (idx === 1) {
          const extent: any = feature.getGeometry().getCoordinates();
          console.log("keys", extent);
          //const coord = [extent[0], extent[1]];
        }
      });
    });

    mapObject.on("pointermove", (event) => {
      clusters.getFeatures(event.pixel).then((features) => {
        //console.log("cluster feature", features);
        if (features[0] !== hoverFeature) {
          hoverFeature = features[0];
          clusterHulls.setStyle(clusterHullStyle);
          const check = hoverFeature && hoverFeature.get("features").length > 1;
          mapObject.getTargetElement().style.cursor = check ? "pointer" : "";
        }
      });
    });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
  }, []);

  return <Box id="map_cluster_03" h="560px" w="100%"></Box>;
}
