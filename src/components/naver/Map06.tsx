import React, { useEffect, useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import { useMapDispatch06, useMapState06 } from "./MapProvider06";
import Seoul from "Data/svgmap_seoul.json";
import Busan from "Data/svgmap_busan.json";
import Ulsan from "Data/svgmap_Ulsan.json";
import Daegu from "Data/svgmap_Daegu.json";
import Daejeon from "Data/svgmap_Daejeon.json";
import Gwangju from "Data/svgmap_Gwangju.json";
import Gyeonggi from "Data/svgmap_Gyeonggi.json";
import Jeju from "Data/svgmap_Jeju.json";
import Incheon from "Data/svgmap_Incheon.json";
import Jeollabuk from "Data/svgmap_Jeollabuk.json";
import Jeollanam from "Data/svgmap_Jeollanam.json";
import GangWon from "Data/svgmap_Gangwon.json";
import Sejong from "Data/svgmap_Sejong.json";
import ChungCheongBuk from "Data/svgmap_ChungCheongBuk.json";
import ChungCheongNam from "Data/svgmap_ChungCheongnam.json";
import Gyeongsangbuk from "Data/svgmap_Gyeongsangbuk.json";
import Gyeongsangnam from "Data/svgmap_Gyeongsangnam.json";

interface IMap05 {
  selectedReg: { code: string; center: any };
  handleSelect: (code: string) => void;
}

export function Map06({ handleSelect, selectedReg }: IMap05) {
  const detailRegion: any = {
    "11": Seoul,
    "26": Busan,
    "31": Ulsan,
    "27": Daegu,
    "41": Gyeonggi,
    "30": Daejeon,
    "29": Gwangju,
    "42": GangWon,
    "50": Jeju,
    "28": Incheon,
    "36": Sejong,
    "45": Jeollabuk,
    "46": Jeollanam,
    "43": ChungCheongBuk,
    "44": ChungCheongNam,
    "47": Gyeongsangbuk,
    "48": Gyeongsangnam,
  };

  //const [dataList, setDataList] = useState(null);

  const { map } = useMapState06();

  const dispatch = useMapDispatch06();

  let mapObject;
  let markerBox;

  function initMap(region: { code: string; center: any }) {
    const centerPoint = new naver.maps.Data().addGeoJson(
      detailRegion[region.code],
      false
    );
    mapObject = new naver.maps.Map("naver_map06", {
      zoom: 10,
      center: new naver.maps.LatLng(region.center.y, region.center.x),
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
    mapObject.data.addGeoJson(detailRegion[region.code], false);
    //setRegionList(regionData.features);
  }

  function renderGeojson() {
    naver.maps.Event.once(map, "init", function (e) {
      //console.log("region init");
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
        handleSelect(e.feature.property_CTPRVN_CD);
        //console.log(e.feature);
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
  function arrangeMap() {
    map.addListener("zoom_changed", () => {
      console.log(map.getZoom());
    });
    //centerPoint.
  }

  useEffect(() => {
    if (selectedReg !== undefined) {
      initMap(selectedReg);
    }
  }, [selectedReg]);

  useEffect(() => {
    if (map !== null) {
      renderGeojson();
      arrangeMap();
      console.log("render init");
    }
  }, [map]);

  return (
    <>
      {selectedReg !== undefined ? (
        <Box w="600px" h="560px" id="naver_map06"></Box>
      ) : (
        <Box w="600px" h="560px" bg="gray.100">
          <Center>지역을 선택하세요</Center>
        </Box>
      )}
    </>
  );
}
