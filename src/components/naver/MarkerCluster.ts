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
  __intersectListners: any[];
}

interface IMarkerOverlay {
  Map: MapProps | null;

  _overlapInfoEl: any;

  _overlapListEl: any;

  _listners: any[];

  Markers: MarkerProps[] | null;

  createMap(opt: IOptions): void;

  setMap(map: MapProps): MapProps;

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
  constructor(options: IOptions) {
    this.options = options;
    //this.map = null;
  }
  options: IOptions;

  public Map: MapProps = null;

  public Markers: MarkerProps[] = null;

  public _listners: any[] = [];
  public _overlapInfoEl: any = $(
    '<div style="position:absolute;z-index:100;margin:0;padding:0;display:none;"></div>'
  );

  public _overlapListEl: any = $(
    '<div style="position:absolute;z-index:100;margin:0;padding:0;display:none;"></div>'
  );

  public rectangle = new naver.maps.Rectangle(this.options.highlightRectStyle);

  createMap(opt: IOptions): void {}

  add(marker: MarkerSetting): void {
    this._listners = this._listners.concat(this._bindMarkerEvent(marker));
    this.Markers.push(marker);
  }

  setMap(map: MapProps): MapProps {
    const oldMap = this.getMap();
    if (map === oldMap) return;
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

  remove(marker: naver.maps.Marker): void {
    this.forEachArray(function (m, i, mr) {
      if (m === marker) {
        marker.splice(i, 1);
      }
    });
    this._unbindMarkerEvent(marker);
  }

  _bindEvent(map: naver.maps.Map): void {
    const listners = this._listners;
    const self = this;
    listners.push(
      map.addListener("idle", () => {}),
      map.addListener("click", () => {})
    );
  }
  _unbindEvent(map: naver.maps.Map): void {
    const mapObject = map || this.getMap();
    naver.maps.Event.removeListener(this._listners);
    this._listners = [];

    this.rectangle.setMap(null);
    this._overlapInfoEl.remove();
    this._overlapListEl.remove();
  }

  _bindMarkerEvent(marker: MarkerSetting): any[] {
    marker.__intersectListners = [
      marker.addListener("mouseover", () => {}),
      marker.addListener("mouseout", () => {}),
      marker.addListener("mousedown", () => {}),
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
    const tolerance = this.options.tolerance || 3;
    const rectLeftTop = offset.clone().sub(tolerance, tolerance);
    const rectRightBottom = offset.clone().add(tolerance, tolerance);

    return naver.maps.PointBounds.bounds(rectLeftTop, rectRightBottom);
  }

  getOverlapedMarkers(
    marker: naver.maps.Marker
  ): { marker: MarkerProps; rect: BoundsProps }[] {
    const baseRect = this.getOverlapRect(marker);
    const overlaped = [{ marker: marker, rect: baseRect }];
    const self = this;

    this.forEachArray(function (m: MarkerProps) {
      if (m === marker) return;

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
    this.rectangle.setMap(null);
    this._overlapInfoEl.hide();
  }
  _onIdle(): void {
    this._overlapInfoEl.hide();
    this._overlapListEl.hide();
  }

  _onOver(e: any): void {
    const marker: MarkerProps = e.overlay;
    const map = this.getMap();
    const proj = map.getProjection();
    const offset = proj.fromCoordToOffset(marker.getPosition());
    const overlaped = this.getOverlapedMarkers(marker);

    if (overlaped.length > 1) {
      if (this.options.highlightRect) {
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

        const boundary = new naver.maps.LatLngBounds(min, max);

        this.rectangle.setBounds(boundary);
      }

      if (this.options.intersectNotice) {
        this._overlapInfoEl
          .html(
            this.options.intersectNoticeTemplate.replace(
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
    if (!this.options.intersectList) return;
    const listLayer = this._overlapListEl;

    const REPEAT_REGEX = /\{\{#repeat\}\}([\s\S]*)\{\{\/#repeat\}\}/gm;
    let template = this.options.intersectListTemplate;
    let itemTemplate = null;
    let itemPlace = null;
    const matches = REPEAT_REGEX.exec(template);
    const uid = this._guid();
    const self = this;

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
      let c = overlaped[i];
      const item = $(
        itemTemplate.replace(/\{\{(\w+)\}\}/g, (match, symbol) => {
          console.log("match", match, symbol);
          return match;
        })
      );
      item.on("click", () => {});
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
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
      .toUpperCase();
    return content;
  }

  _onDown(e: any): void {
    const marker: MarkerProps = e.overlay;
    const map = this.getMap();
    const proj = map.getProjection();
    const offset = proj.fromCoordToOffset(marker.getPosition());
    const overlaped = this.getOverlapedMarkers(marker);
    const self = this;

    naver.maps.Event.resumeDispatch(marker, "click");

    if (overlaped.length <= 1) {
      return;
    }
    naver.maps.Event.stopDispatch(marker, "click");
    this._overlapInfoEl.hide();

    naver.maps.Event.trigger(this, "overlap", overlaped);
  }

  _onClickItem(marker: naver.maps.Marker, e: any): void {
    naver.maps.Event.resumeDispatch(marker, "click");
    naver.maps.Event.trigger(this, "clickItem", {
      overlay: marker,
      originalEvent: e.originalEvent,
    });

    marker.trigger("click");
  }
}
export default MarkerOverlay;
