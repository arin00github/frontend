import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useMapDispatch, useMapState } from "./MapProvider01";
import HotelList from "../../service/data/naver01_hotel.json";
import CafeList from "Data/naver01_cafe.json";
import HospitalList from "Data/naver01_hospital.json";
import { MapProps, MarkerProps } from "./Naver_map";

type newLayerProps = naver.maps.CadastralLayer;

export const Map01 = () => {
  const { map } = useMapState();
  const dispatch = useMapDispatch();

  let mapObject: MapProps = null;
  let mapElement: any = null;

  const totalList: { location: number[]; type?: string; name: string }[] = [
    ...HospitalList,
    ...CafeList,
    ...HotelList,
  ];
  //console.log(totalList);

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
    // totalList.map((unit) => {
    //   let imgUrl: string;
    //   if (unit.type === "cafe")
    //     return (imgUrl = "../../assets/images/marker_C.png");
    //   else if (unit.type === "hotel")
    //     return (imgUrl = "../../assets/images/marker_H.png");
    //   else if (unit.type === "hospital")
    //     return (imgUrl = "../../assets/images/marker_H.png");
    //   console.log(imgUrl);

    //   const mapMarker = new naver.maps.Marker({
    //     position: new naver.maps.LatLng(unit.location[0], unit.location[1]),
    //     map: map,
    //     title: unit.name,
    //     icon: {
    //       url: "../../assets/images/marker_H.png",
    //       anchor: new naver.maps.Point(12, 37),
    //     },
    //   });
    // });
    HotelList.map((unit) => {
      const mapMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(unit.location[0], unit.location[1]),
        map: map,
        title: unit.name,
        icon: {
          url: "../../assets/images/marker_H.png",
          anchor: new naver.maps.Point(12, 37),
        },
      });
      return mapMarker;
    });
    CafeList.map((unit) => {
      const mapMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(unit.location[0], unit.location[1]),
        map: map,
        title: unit.name,
        icon: {
          url: "../../assets/images/marker_C.png",
          anchor: new naver.maps.Point(12, 37),
        },
      });
      return mapMarker;
    });
    HospitalList.map((unit) => {
      const mapMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(unit.location[0], unit.location[1]),
        map: map,
        title: unit.name,
        icon: {
          url: "../../assets/images/marker_R.png",
          anchor: new naver.maps.Point(12, 37),
        },
      });
      return mapMarker;
    });
  };

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
      initMarker();
      registerMapType();
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
    ></Box>
  );
};
