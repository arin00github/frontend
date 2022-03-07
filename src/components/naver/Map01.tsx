import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useMapDispatch, useMapState } from "./MapProvider01";
import HotelList from "../../service/data/naver01.json";

type MapProps = naver.maps.Map;
type MarkerProps = naver.maps.Marker;
type newLayerProps = naver.maps.CadastralLayer;

export const Map01 = () => {
  const { map } = useMapState();
  const dispatch = useMapDispatch();

  const [showLayer, setShowLayer] = useState<boolean>(false);

  let mapObject: MapProps = null;
  let mapElement: any = null;
  let marker: MarkerProps = null;
  const markersArray: MarkerProps[] = null;
  const newLayer: newLayerProps = new naver.maps.CadastralLayer();

  const initMap = () => {
    mapObject = new naver.maps.Map("naver_map", {
      center: new naver.maps.LatLng(37.49833167926974, 127.02756490181244),
      zoom: 13,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN,
      },
      //   scaleControl: true,
      //   zoomControl: true,
      //   zoomControlOptions: {
      //     style: naver.maps.ZoomControlStyle.LARGE,
      //   },
      //   mapDataControl: true,
    });
    mapElement = mapObject.getElement();
    dispatch({ type: "CHANGE_MAP", map: mapObject });
  };

  const addLayer = () => {
    naver.maps.Event.once(map, "init", function () {
      newLayer.setMap(map);
    });
  };

  const initMarker = () => {
    marker = new naver.maps.Marker({
      position: map.getCenter(),
      map: map,
      title: "click to zoom",
    });

    HotelList.map((unit) => {
      const mapMarker = new naver.maps.Marker({
        position: {
          x: unit.location[1],
          _lng: unit.location[1],
          y: unit.location[0],
          _lat: unit.location[0],
        },
        map: map,
        title: unit.name,
      });
      return mapMarker;
    });
  };

  const toggleLayer = (e: any) => {
    e.preventDefault();

    // naver.maps.Event.addListener(
    //   map,
    //   "cadastralLayer_changed",
    //   function (layer) {
    //     console.log("layer", layer);
    //   }
    // );

    if (newLayer.getMap()) {
      newLayer.setMap(null);
    } else {
      newLayer.setMap(map);
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (map !== null) {
      console.log("useEffect");
      initMarker();
      addLayer();
    }
  }, [map]);

  return (
    <Box
      id="naver_map"
      w="100%"
      h="560px"
      //  onClick={() => eventListner()}
    >
      <Button onClick={toggleLayer} zIndex={1000}>
        {showLayer ? "지적도 끄기" : "지적도 켜기"}
      </Button>
    </Box>
  );
};
