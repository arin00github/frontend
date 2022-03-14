import $ from "jquery";
import { MapProps, MarkerProps, BoundsProps } from "./Naver_map";

interface IOptions {
  tolerance?: number;
  highlightRect?: boolean;
  highlightRectStyle?: naver.maps.RectangleOptions;
  intersectNotice?: boolean;
  intersectNoticeTemplate?: string;
  intersectList?: boolean;
  intersectListTemplate?: string;
}

interface MarkerSetting extends MarkerProps {
  __intersectListners?: any[];
}

interface IMarkerOverlay {
  Map: MapProps | null;

  _overlapInfoEl: any;

  _overlapListEl: any;

  _listners: any[];

  Markers: MarkerProps[] | null;

  settingOption: IOptions;

  options: IOptions;

  initRect(map: MapProps): void;

  setOptions(map: MapProps): void;

  setMap(map: MapProps | null): MapProps | null;

  getMap(): MapProps;

  _bindEvent(map: MapProps): void;

  _unbindEvent(map: MapProps): void;

  add(marker: MarkerSetting): void;

  remove(marker: MarkerProps): void;

  forEachArray(callback: any): void;

  hide(): void;

  _bindMarkerEvent(marker: MarkerSetting): any[];

  _unbindMarkerEvent(marker: MarkerSetting): void;

  getOverlapRect(marker: MarkerProps): BoundsProps;

  getOverlapedMarkers(
    marker: MarkerProps
  ): { marker: MarkerProps; rect: BoundsProps }[];

  _onIdle(): void;

  _onOver(e: any): void;

  _onOut(e: any): void;

  _guid(): string;

  _renderIntersectList(overlaped: any[], offset: any): void;

  _onDown(e: any): void;

  _onClickItem(marker: MarkerProps, e: any): void;
}

class MarkerOverlay implements IMarkerOverlay {
  constructor(map: MapProps, options: IOptions) {
    this.options = options;
    this.Map = map;
    this.Markers;
    this._listners;
    this._overlapInfoEl;
    this._overlapListEl;
    this.rectangle;
  }

  public options;

  public settingOption: IOptions = null;

  public Map: MapProps = null;

  public Markers: MarkerProps[] = [];

  public _listners: any[] = [];
  public _overlapInfoEl: any = $(
    '<div style="position:absolute;z-index:100;margin:0;padding:0;display:none;"></div>'
  );

  public _overlapListEl: any = $(
    '<div style="position:absolute;z-index:100;margin:0;padding:0;display:none;"></div>'
  );

  public rectangle =
    this.settingOption !== null
      ? new naver.maps.Rectangle(this.settingOption.highlightRectStyle)
      : null;

  initRect(map: MapProps): void {
    //
  }

  setOptions(map: MapProps): void {
    const bounds = map.getBounds();
    const swValue = new naver.maps.LatLng(bounds.getMin().y, bounds.getMin().x);
    const neValue = new naver.maps.LatLng(bounds.getMax().y, bounds.getMax().x);
    const resetting = Object.assign(
      {
        tolerance: 5,
        highlightRect: true,
        highlightRectStyle: {
          bounds: new naver.maps.LatLngBounds(swValue, neValue),
          strokeColor: "#ff0000",
          strokeOpacity: 1,
          strokeWeight: 2,
          strokeStyle: "dot",
          fillColor: "#ff0000",
          fillOpacity: 0.5,
        },
        intersectNotice: true,
        intersectNoticeTemplate:
          '<div style="width:180px;border:solid 1px #333;background-color:#fff;padding:5px;"><em style="font-weight:bold;color:#f00;">{{count}}</em>개의 마커가 있습니다.</div>',
        intersectList: true,
        intersectListTemplate:
          '<div style="width:200px;border:solid 1px #333;background-color:#fff;padding:5px;">' +
          '<ul style="list-style:none;margin:0;padding:0;">' +
          "{{#repeat}}" +
          '<li style="list-style:none;margin:0;padding:0;"><a href="#">{{order}}. {{title}}</a></li>' +
          "{{/#repeat}}" +
          "</ul>" +
          "</div>",
      },
      this.options
    );
    this.settingOption = resetting;
  }

  add(marker: MarkerSetting): void {
    this._listners = this._listners.concat(this._bindMarkerEvent(marker));
    this.Markers.push(marker);
  }

  setMap(map: MapProps | null): MapProps | null {
    const oldMap = this.getMap();
    console.log("setMap", map);
    if (map === oldMap) return;

    this._unbindEvent();
    this.hide();

    if (map) {
      this._bindEvent(map);
      this._overlapInfoEl.appendTo(map.getPanes().floatPane);
      this._overlapListEl.appendTo(map.getPanes().floatPane);
      this.setOptions(map);
    }

    this.Map = map || null;
  }

  getMap(): MapProps {
    return this.Map;
  }

  forEachArray(callback: any): void {
    const markerArray = this.Markers;
    for (let i = markerArray.length - 1; i >= 0; i--) {
      callback(markerArray[i], i, markerArray);
    }
  }

  hide(): void {
    this._overlapInfoEl.hide();
    this._overlapListEl.hide();
  }

  remove(marker: MarkerSetting): void {
    this.forEachArray(function (m: MarkerProps, i: number, mr: MarkerProps[]) {
      if (m === marker) {
        mr.splice(i, 1);
      }
    });
    this._unbindMarkerEvent(marker);
  }

  _bindEvent(map: naver.maps.Map): void {
    const listners = this._listners;
    //const self = this;
    listners.push(
      naver.maps.Event.addListener(map, "idle", () => this._onIdle),
      naver.maps.Event.addListener(map, "idle", () => this._onIdle)
    );
  }
  _unbindEvent(map?: naver.maps.Map): void {
    console.log("_unbindEvent");
    const mapObject = map || this.getMap();
    naver.maps.Event.removeListener(this._listners);
    this._listners = [];

    this._overlapInfoEl.remove();
    this._overlapListEl.remove();
  }

  _bindMarkerEvent(marker: MarkerSetting): any[] {
    marker.__intersectListners = [
      naver.maps.Event.addListener(marker, "mouseover", (e) => {
        this._onOver(e);
      }),
      naver.maps.Event.addListener(marker, "mouseout", (e) => {
        this._onOut(e);
      }),
      naver.maps.Event.addListener(marker, "mousedown", (e) => this._onDown(e)),
    ];

    return marker.__intersectListners;
  }

  _unbindMarkerEvent(marker: MarkerSetting): void {
    naver.maps.Event.removeListener(marker.__intersectListners);
    delete marker.__intersectListners;
  }

  getOverlapRect(marker: naver.maps.Marker): naver.maps.Bounds {
    const map = this.getMap();
    const proj = map.getProjection();
    const position = marker.getPosition();
    const offset = proj.fromCoordToOffset(position);
    const tolerance = this.settingOption.tolerance || 3;
    const rectLeftTop = offset.clone().sub(tolerance, tolerance);
    const rectRightBottom = offset.clone().add(tolerance, tolerance);
    const box = naver.maps.PointBounds.bounds(rectLeftTop, rectRightBottom);
    return box;
  }

  getOverlapedMarkers(
    marker: naver.maps.Marker
  ): { marker: MarkerProps; rect: BoundsProps }[] {
    console.log("getOverlapedMarkers");
    const baseRect = this.getOverlapRect(marker);
    const overlaped = [{ marker: marker, rect: baseRect }];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    this.forEachArray(function (m: MarkerProps, idx: number) {
      if (m === marker) {
        console.log("end");
        return;
      }
      const rect = self.getOverlapRect(m);
      if (rect.intersects(baseRect)) {
        overlaped.push({
          marker: m,
          rect: rect,
        });
      }
    });

    return overlaped;
  }

  _onOut(e: any): void {
    console.log("_onOut");
    //this.rectangle.setMap(null);
    this.rectangle = null;
    this._overlapInfoEl.hide();
  }
  _onIdle(): void {
    console.log("_onIdle");
    this._overlapInfoEl.hide();
    this._overlapListEl.hide();
  }

  _onOver(e: any): void {
    console.log("onOver");
    const marker: MarkerProps = e.overlay;
    const map = this.getMap();
    const proj = map.getProjection();
    const offset = proj.fromCoordToOffset(marker.getPosition());
    const overlaped = this.getOverlapedMarkers(marker);
    console.log("overlaped", overlaped.length);

    if (overlaped.length > 1) {
      if (this.settingOption.highlightRect) {
        let bounds: BoundsProps;
        for (let i = 0; i < overlaped.length; i++) {
          if (bounds) {
            bounds = bounds.union(overlaped[i].rect);
          } else {
            bounds = overlaped[i].rect.clone();
          }
        }

        const min = proj.fromOffsetToCoord(bounds.getMin());
        const max = proj.fromOffsetToCoord(bounds.getMax());
        const minValue = new naver.maps.LatLng(min.y, min.x);
        const maxValue = new naver.maps.LatLng(max.y, max.x);

        const boundary = new naver.maps.LatLngBounds(minValue, maxValue);

        this.rectangle.setBounds(boundary);
      }

      if (this.settingOption.intersectNotice) {
        this._overlapInfoEl
          .html(
            this.settingOption.intersectNoticeTemplate.replace(
              /\{\{count\}\}/g,
              String(overlaped.length)
            )
          )
          .css({
            left: offset.x,
            top: offset.y,
          })
          .show();
      }
    } else {
      this.hide();
    }
  }

  _renderIntersectList(overlaped: any[], offset: any): void {
    console.log("_renderIntersectList");
    if (!this.settingOption.intersectList) return;
    const listLayer = this._overlapListEl;

    const REPEAT_REGEX = /\{\{#repeat\}\}([\s\S]*)\{\{\/#repeat\}\}/gm;
    let template = this.settingOption.intersectListTemplate;
    let itemTemplate = null;
    let itemPlace = null;
    const matches = REPEAT_REGEX.exec(template);
    const uid = this._guid();
    //const self = this;

    listLayer.empty();

    if (matches && matches.length >= 2) {
      template = template.replace(
        matches[0],
        '<div id="intersects-' + uid + '"></div>'
      );
      itemTemplate = matches[1];
      listLayer.append($(template));

      let placeholder = $("#intersects-" + uid);
      itemPlace = placeholder.parent();
      placeholder.remove();
      placeholder = null;
    } else {
      itemTemplate = template;
      itemPlace = listLayer;
    }

    const items = [];
    for (let i = 0; i < overlaped.length; i++) {
      const c = overlaped[i];
      console.log("c", c);
      const item = $(
        itemTemplate.replace(/\{\{(\w+)\}\}/g, (match, symbol) => {
          console.log("match", match, symbol);
          if (symbol === "order") {
            return i + 1;
          } else if (c.marker.get(symbol)) {
            console.log("example01");
            return c.marker.get(symbol);
          } else {
            match;
          }
        })
      );

      item.on("click", () => this._onClickItem(c.marker, self));
      items.push(item);
    }
    for (let j = 0; j < items.length; j++) {
      itemPlace.append(items[j]);
    }
    listLayer
      .css({
        left: offset.x + 5,
        top: offset.y,
      })
      .show();
  }

  _guid(): string {
    const content = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
      .replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
      .toUpperCase();
    return content;
  }

  _onDown(e: any): void {
    console.log("onDown");
    const marker: MarkerProps = e.overlay;
    const map = this.getMap();
    const proj = map.getProjection();
    const offset = proj.fromCoordToOffset(marker.getPosition());
    const overlaped = this.getOverlapedMarkers(marker);
    //const self = this;

    naver.maps.Event.resumeDispatch(marker, "click");

    if (overlaped.length <= 1) {
      return;
    }
    naver.maps.Event.stopDispatch(marker, "click");
    this._renderIntersectList(overlaped, offset);
    this._overlapInfoEl.hide();

    naver.maps.Event.trigger(this, "overlap", overlaped);
  }

  _onClickItem(marker: naver.maps.Marker, e: any): void {
    console.log("onClickItem");
    naver.maps.Event.resumeDispatch(marker, "click");
    naver.maps.Event.trigger(this, "clickItem", {
      overlay: marker,
      originalEvent: e.originalEvent,
    });

    marker.trigger("click");
  }
}
export default MarkerOverlay;
