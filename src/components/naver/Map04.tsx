import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useMapDispatch, useMapState } from "./MapProvider04";
import "./map.css";

export function Map04() {
  const { map } = useMapState();

  const dispatch = useMapDispatch();

  let mapObject;
  let contentEl: HTMLDivElement;
  let semaphore = false;
  function initMap() {
    mapObject = new naver.maps.Map("naver_map04", {
      zoom: 6,
      center: new naver.maps.LatLng(36.2253017, 127.6460516),
      zoomControl: true,
      padding: { top: 100 },
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    });
    dispatch({ type: "CHANGE_MAP", map: mapObject });
  }

  function initOption() {
    contentEl = document.createElement("div");
    contentEl.classList.add("iw_inner");
    contentEl.style.width = "240px";
    contentEl.style.height = "180px";
    contentEl.style.position = "absolute";
    contentEl.style.bottom = "0";
    contentEl.style.right = "0";
    contentEl.style.background = "#ffffff";
    contentEl.style.zIndex = "100";
    map.getElement().appendChild(contentEl);
    //console.log(map.getElement());

    const titleEl = document.createElement("h3");
    titleEl.innerText = "Map State";

    const zoomEl = document.createElement("p");

    const centerEl = document.createElement("p");

    contentEl.appendChild(titleEl);
    contentEl.appendChild(zoomEl);
    contentEl.appendChild(centerEl);

    naver.maps.Event.addListener(map, "zoom_changed", function (zoom) {
      zoomEl.innerText = `zoom : ${zoom}`;
    });

    naver.maps.Event.addListener(map, "bounds_changed", function (bounds) {
      centerEl.innerText = `bounds : ${bounds.toString()}`;
    });
  }
  // function drawMiniMap() {
  //   miniMap = document.createElement("div");
  //   miniMap.id = "minimap";
  // }

  function initMiniMap() {
    naver.maps.Event.once(map, "init", function () {
      map.setOptions({
        mapTypeControl: true,
        scaleControl: false,
        logoControl: false,
      });

      const miniMapHtml = '<div class="minimap" id="minimap"></div>';
      const locationBtnHtml =
        '<a href="#" class="btn_mylct"><span class="spr_trff spr_ico_mylct">NAVER 그린팩토리</span></a>';
      const customControl = new naver.maps.CustomControl(miniMapHtml, {
        position: naver.maps.Position.TOP_LEFT,
      });

      customControl.setMap(map);
      const minimapObject = new naver.maps.Map("minimap", {
        //미니 맵 지도를 생성합니다.
        bounds: map.getBounds(),
        scrollWheel: false,
        scaleControl: false,
        mapDataControl: false,
        logoControl: false,
      });

      naver.maps.Event.addListener(map, "bounds_changed", function (bounds) {
        if (semaphore) return;

        minimapObject.fitBounds(bounds);
      });

      naver.maps.Event.addListener(minimapObject, "drag", function () {
        semaphore = true;
        map.panTo(minimapObject.getCenter(), {});
        naver.maps.Event.once(map, "idle", function () {
          semaphore = false;
        });
      });
    });
  }

  useEffect(() => {
    initMap();
    //drawMiniMap();
    //setDataList(dataArray.searchResult.accidentDeath);
  }, []);

  useEffect(() => {
    if (map !== null) {
      initOption();
      initMiniMap();
    }
  }, [map]);

  return (
    <>
      <Box w="1400px" h="680px" id="naver_map04" pos="relative">
        <div style={{ width: 180, height: 120, background: "white" }}></div>
      </Box>
    </>
  );
}
