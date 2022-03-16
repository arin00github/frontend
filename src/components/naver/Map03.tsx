import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { useMapDispatch, useMapState } from "./MapProvider03";
import ClusterLayer from "./MarkerCluster";
import DataList from "../../service/data/cluster.json";

export function Map03() {
  const [dataList, setDataList] = useState(null);

  const { map } = useMapState();

  const dispatch = useMapDispatch();

  let mapObject;
  let markerBox;
  const semaphore = false;

  function initMap() {
    mapObject = new naver.maps.Map("naver_map03", {
      zoom: 6,
      //minZoom: 6,
      center: new naver.maps.LatLng(36.2253017, 127.6460516),
      // mapTypeId: naver.maps.MapTypeId.HYBRID,
      // zoomControl: true,
      // zoomControlOptions: {
      //   position: naver.maps.Position.TOP_RIGHT,
      // },
      // mapDataControl: false,
      // logoControlOptions: {
      //   position: naver.maps.Position.LEFT_BOTTOM,
      // },
      // disableKineticPan: false,
    });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
  }
  let markerClustering: ClusterLayer = null;

  function initOption() {
    const data = DataList.searchResult.accidentDeath;

    const markers = [];

    for (let i = 0; i < data.length; i++) {
      const spot = data[i];
      const latlng = new naver.maps.LatLng(
        Number(spot.grd_la),
        Number(spot.grd_lo)
      );
      const marker = new naver.maps.Marker({
        position: latlng,
        draggable: true,
      });
      //console.log(marker.getPosition());

      markers.push(marker);
    }

    const htmlMarker1 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../assets/images/cluster-marker-1.png);background-size:contain;"></div>',
        size: new naver.maps.Size(40, 40),
        anchor: new naver.maps.Point(20, 20),
      },
      htmlMarker2 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../assets/images/cluster-marker-2.png);background-size:contain;"></div>',
        size: new naver.maps.Size(40, 40),
        anchor: new naver.maps.Point(20, 20),
      },
      htmlMarker3 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../assets/images/cluster-marker-3.png);background-size:contain;"></div>',
        size: new naver.maps.Size(40, 40),
        anchor: new naver.maps.Point(20, 20),
      },
      htmlMarker4 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../assets/images/cluster-marker-4.png);background-size:contain;"></div>',
        size: new naver.maps.Size(40, 40),
        anchor: new naver.maps.Point(20, 20),
      },
      htmlMarker5 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../assets/images/cluster-marker-5.png);background-size:contain;"></div>',
        size: new naver.maps.Size(40, 40),
        anchor: new naver.maps.Point(20, 20),
      };

    markerClustering = new ClusterLayer({
      minClusterSize: 2,
      maxZoom: 10,
      map: map,
      markers: markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
      indexGenerator: [10, 100, 200, 500, 1000],
      stylingFunction: function (clusterMarker: any, count: any) {
        //$(clusterMarker.getElement()).find("div:first-child").text(count);
      },
    });
    console.log(markerClustering);
    //markerClustering.onAdd();
  }
  // function execute() {
  //   markerClustering.onAdd();
  // }

  useEffect(() => {
    initMap();
    //setDataList(dataArray.searchResult.accidentDeath);
  }, []);

  useEffect(() => {
    if (map !== null) {
      initOption();
    }
  }, [map]);

  return (
    <>
      <Box w="1400px" h="680px" id="naver_map03" pos="relative">
        <Box
          id="mini_map"
          w="240px"
          h="240px"
          pos="absolute"
          bottom={0}
          right={0}
          zIndex={1000}
        ></Box>
      </Box>
    </>
  );
}
