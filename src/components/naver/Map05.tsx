import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useMapDispatch05, useMapState05 } from "./MapProvider05";
import regionData from "Data/map.json";
import { FeatureProps } from "./Naver_map";

interface IMap05 {
  handleSelect: (code: string, center?: any) => void;
}

export function Map05({ handleSelect }: IMap05) {
  const [selectedReg, setSelectedReg] = useState<string>(undefined);

  const { map } = useMapState05();

  const dispatch = useMapDispatch05();

  let mapObject;

  function initMap() {
    mapObject = new naver.maps.Map("naver_map05", {
      zoom: 7,
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
      map.data.setStyle(function (feature: FeatureProps) {
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
        const feature = e.feature;
        const targetId = feature.property_CTPRVN_CD;
        const targetCenter = {
          x:
            (feature.bounds._max.x - feature.bounds._min.x) / 2 +
            feature.bounds._min.x,
          y:
            (feature.bounds._max.y - feature.bounds._min.y) / 2 +
            feature.bounds._min.y,
        };
        setSelectedReg(targetId);
        handleSelect(targetId, targetCenter);
        //console.log(feature);

        map.data.forEach((region: any) => {
          if (region.property_CTPRVN_CD === targetId) {
            if (feature.getProperty("focus") !== true) {
              feature.setProperty("focus", true);
            } else {
              feature.setProperty("focus", false);
            }
          } else {
            region.setProperty("focus", false);
          }
        });
      });
      map.data.addListener("mouseover", function (e: any) {
        const feature = e.feature;

        map.data.overrideStyle(feature, {
          fillOpacity: 0.6,
          strokeWeight: 4,
          strokeOpacity: 1,
        });
      });

      map.data.addListener("mouseout", function (e: any) {
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
      <Box w="600px" h="560px" id="naver_map05"></Box>
    </>
  );
}
