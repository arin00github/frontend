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
    });
    mapElement = mapObject.getElement();
    dispatch({ type: "CHANGE_MAP", map: mapObject });
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

  // const addLayer = () => {
  //   naver.maps.Event.once(map, "init", function () {
  //     newLayer.setMap(map);
  //   });
  // };

  // const toggleLayer = (e: any) => {
  //   e.preventDefault();

  //   if (newLayer.getMap()) {
  //     newLayer.setMap(null);
  //   } else {
  //     newLayer.setMap(map);
  //   }
  // };

  // const pointerClick = () => {
  //   naver.maps.Event.addListener(map, "click", function (e) {
  //     marker.setPosition(e.latlng);
  //   });
  // };

  const myMapType: naver.maps.MapType = {
    name: "Alphabet",
    minZoom: 0,
    maxZoom: 22,
    projection: null,
    tileSize: new naver.maps.Size(50, 50),
    getTile: function (x, y, z) {
      const w: number = this.tileSize.width;
      const h: number = this.tileSize.heigth;

      const putNum = Math.abs(x + y) % 26;
      const ascii = putNum + 65;
      const alphabet = String.fromCharCode(ascii);
      const divBox = document.createElement("div");
      divBox.classList.add("mytitle");
      divBox.innerText = alphabet;

      divBox.style.width = `${w}px`;
      divBox.style.height = `${h}px`;
      divBox.style.lineHeight = `${h}px`;
      divBox.style.fontSize = `${Math.min(w, h) - 10}px`;
      divBox.style.opacity = `${1 - (ascii - 65) * 0.04}`;

      return divBox;
    },
  };

  const registerMapType = () => {
    map.mapTypes.set("mine", myMapType);
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (map !== null) {
      console.log("useEffect");
      initMarker();
      registerMapType();
      //addLayer();
      //pointerClick();
    }
    return () => {
      //
    };
  }, [map]);

  return (
    <Box
      id="naver_map"
      //w="100%"
      h="560px"
      w="1200px"
      //  onClick={() => eventListner()}
    >
      {/* <Button onClick={toggleLayer} zIndex={1000}>
        {showLayer ? "지적도 끄기" : "지적도 켜기"}
      </Button> */}
    </Box>
  );
};
