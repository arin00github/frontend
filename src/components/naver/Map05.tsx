import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useMapDispatch05, useMapState05 } from "./MapProvider05";
import regionData from "Data/map.json";

export function Map05() {
  const [dataList, setDataList] = useState(null);
  const [regionList, setRegionList] = useState(null);

  const { map } = useMapState05();

  const dispatch = useMapDispatch05();

  let mapObject;
  let markerBox;

  function initMap() {
    mapObject = new naver.maps.Map("naver_map05", {
      zoom: 6,
      center: new naver.maps.LatLng(36.2253017, 127.6460516),
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
    mapObject.data.addGeoJson(regionData, false);
    //setRegionList(regionData.features);
  }

  function renderGeojson() {
    naver.maps.Event.once(map, "init", function (e) {
      map.data.setStyle(function (feature: naver.maps.Feature) {
        const styleOptions = {
          fillColor: "#ff0000",
          fillOpacity: 0.0001,
          strokeColor: "#ff0000",
          strokeWeight: 2,
          strokeOpacity: 0.4,
        };

        if (feature.getProperty("focus")) {
          styleOptions.fillOpacity = 0.6;
          styleOptions.fillColor = "#0f0";
          styleOptions.strokeColor = "#0f0";
          styleOptions.strokeWeight = 4;
          styleOptions.strokeOpacity = 1;
        }

        return styleOptions;
      });

      map.data.addListener("click", function (e: any) {
        console.log("event", e);
        const feature = e.feature;

        if (feature.getProperty("focus") !== true) {
          feature.setProperty("focus", true);
        } else {
          feature.setProperty("focus", false);
        }
      });
      map.data.addListener("mouseover", function (e: any) {
        const feature = e.feature;
        const regionName = feature.getProperty("area1");

        // tooltip.css({
        //     display: '',
        //     left: e.offset.x,
        //     top: e.offset.y
        // }).text(regionName);

        map.data.overrideStyle(feature, {
          fillOpacity: 0.6,
          strokeWeight: 4,
          strokeOpacity: 1,
        });
      });

      map.data.addListener("mouseout", function (e: any) {
        //tooltip.hide().empty();
        map.data.revertStyle();
      });
    });
  }

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (map !== null) {
      renderGeojson();
    }
  }, [map]);

  return (
    <>
      <Box w="1200px" h="560px" id="naver_map05"></Box>
    </>
  );
}
