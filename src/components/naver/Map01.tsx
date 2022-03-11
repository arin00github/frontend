import React, { useEffect, useState } from "react";
import { Box, Button, Stack, HStack } from "@chakra-ui/react";
import { useMapDispatch, useMapState } from "./MapProvider01";
import HotelList from "../../service/data/naver01_hotel.json";
import CafeList from "Data/naver01_cafe.json";
import HospitalList from "Data/naver01_hospital.json";
import TotalList from "Data/naver01.json";
import { MapProps, MarkerProps } from "./Naver_map";

type newLayerProps = naver.maps.CadastralLayer;

export const Map01 = () => {
  const [markerList, setMarkerList] = useState<MarkerProps[]>(null);
  const [dataList, setDataList] = useState(null);

  const { map } = useMapState();
  const dispatch = useMapDispatch();

  let mapObject: MapProps = null;
  let mapElement: any = null;

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

  const initMarker = (arrayList: any[]) => {
    const newArray = arrayList.map((unit) => {
      let imgUrl;
      if (unit.type === "hotel") {
        imgUrl = "../../assets/images/marker_H.png";
      } else if (unit.type === "cafe") {
        imgUrl = "../../assets/images/marker_C.png";
      } else if (unit.type === "park") {
        imgUrl = "../../assets/images/marker_R.png";
      } else if (unit.type === "hospital") {
        imgUrl = "../../assets/images/marker_H.png";
      }

      const mapMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(unit.location[0], unit.location[1]),
        map: map,
        title: unit.name,
        icon: {
          url: imgUrl,
          anchor: new naver.maps.Point(12, 37),
        },
      });
      return mapMarker;
    });
    //console.log(newArray);
    setMarkerList(newArray);
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
    setDataList(TotalList);
  }, []);

  useEffect(() => {
    if (map !== null) {
      initMarker(dataList);
      registerMapType();
    }
    return () => {
      //
    };
  }, [map, dataList]);

  return (
    <>
      <HStack spacing={3}>
        <Button
          size="sm"
          onClick={() => {
            markerList.forEach((unit) => {
              unit.setMap(null);
            });
            const newArray = TotalList.filter((unit) => unit.type === "hotel");
            setDataList(newArray);
          }}
        >
          H marker
        </Button>
        <Button
          size="sm"
          onClick={() => {
            markerList.forEach((unit) => {
              unit.setMap(null);
            });
            const newArray = TotalList.filter((unit) => unit.type === "park");
            setDataList(newArray);
          }}
        >
          R marker
        </Button>
        <Button
          size="sm"
          onClick={() => {
            markerList.forEach((unit) => {
              unit.setMap(null);
            });
            const newArray = TotalList.filter((unit) => unit.type === "cafe");
            setDataList(newArray);
          }}
        >
          C marker
        </Button>
        <Button
          size="sm"
          onClick={() => {
            markerList.forEach((unit) => {
              unit.setMap(null);
            });
            setDataList(TotalList);
          }}
        >
          전체
        </Button>
      </HStack>
      <Box
        id="naver_map"
        //w="100%"
        h="560px"
        w="1200px"
        //  onClick={() => eventListner()}
      ></Box>
    </>
  );
};
