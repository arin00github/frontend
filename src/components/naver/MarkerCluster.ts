import {
  MapProps,
  MarkerProps,
  BoundsProps,
  LayerProps,
  LatLngProps,
  PointProps,
} from "./Naver_map";
import $ from "jquery";

interface IOption {
  map: MapProps | null;
  markers: MarkerProps[] | null;
  disableClickZoom?: boolean;
  minClusterSize?: number;
  maxZoom?: number;
  gridSize?: number;
  icons?: any[];
  indexGenerator?: number[];
  averageCenter?: boolean;
  stylingFunction?: (clusterMarker: any, count: any) => void;
}

interface ICluster {
  _clusterCenter: null | naver.maps.Coord;
  _clusterBounds: naver.maps.LatLngBounds;
  _clusterMarker: MarkerProps;
  _relation: any;
  _clusterMember: naver.maps.Marker[];
  _markerClusterer: ClusterLayer;

  addMarker(marker: MarkerProps): void;

  destroy(): void;
  getCenter(): naver.maps.Coord | null;
  getBounds(): naver.maps.LatLngBounds;
  getCount(): number;
  getClusterMember(): MarkerProps[];
  isInBounds(latlng: naver.maps.Coord): boolean;
  enableClickZoom(): void;
  disableClickZoom(): void;
  updateCluster(): void;
  checkByZoomAndMinClusterSize(): void;
  updateCount(): void;
  updateIcon(): void;
  _showMember(): void;
  _hideMember(): void;
  _calcBounds(position: naver.maps.Coord): naver.maps.LatLngBounds;
  _getIndex(count: number): number;
  _isMember(marker: MarkerProps): boolean;
  _calcAverageCenter(markers: MarkerProps[]): PointProps;
}

interface IClusterLayer {
  _clusters: ICluster[];
  _mapRelations: any;
  _markerRelations: any[];
  _options: naver.maps.KVO;
  _clearCluster(): void;
  _createClusters(): void;
  _updateClusters(): void;
  getOptions(key: string): any;
  setOptions(newOptions: string | IOption | any, value?: any): void;
  _getClosestCluster(position: naver.maps.Coord): ICluster;
  changed(key: string, value: any): void;
  getMinClusterSize(): number;
  setMinClusterSize(size: number): void;
  getMaxZoom(): number;
  setMaxZoom(size: number): void;
  getGridSize(): number;
  setGridSize(size: number): void;
  getIcons(): any[];
  setIcons(icons: any[]): void;
  getStylingFunction(): any;
  setStylingFunction(func: () => any): void;
  getDisableClickZoom(): boolean;
  setDisableClickZoom(flag: boolean): void;
  getMarkers(): naver.maps.Marker[];
  setMarkers(markers: naver.maps.Marker[]): void;
  getAverageCenter(): boolean;
  setAverageCenter(averageCenter: boolean): void;
  _onIdle(): void;
  _redraw(): void;
  _onDragEng(): void;
}

class ClusterLayer extends naver.maps.OverlayView implements IClusterLayer {
  public _options: naver.maps.KVO = new naver.maps.KVO();

  constructor(options: IOption) {
    super();
    //this._options = options;
    this.setOptions(options);
    //this.setMap(options.map);
    this._clusters;
    this._mapRelations;
    this._markerRelations;
  }

  public DEFAULT_OPTIONS: IOption = {
    // 클러스터 마커를 올릴 지도입니다.
    map: null,
    // 클러스터 마커를 구성할 마커입니다.
    markers: [],
    // 클러스터 마커 클릭 시 줌 동작 여부입니다.
    disableClickZoom: true,
    // 클러스터를 구성할 최소 마커 수입니다.
    minClusterSize: 2,
    // 클러스터 마커로 표현할 최대 줌 레벨입니다. 해당 줌 레벨보다 높으면, 클러스터를 구성하고 있는 마커를 노출합니다.
    maxZoom: 13,
    // 클러스터를 구성할 그리드 크기입니다. 단위는 픽셀입니다.
    gridSize: 100,
    // 클러스터 마커의 아이콘입니다. NAVER Maps JavaScript API v3에서 제공하는 아이콘, 심볼, HTML 마커 유형을 모두 사용할 수 있습니다.
    icons: [],
    // 클러스터 마커의 아이콘 배열에서 어떤 아이콘을 선택할 것인지 인덱스를 결정합니다.
    indexGenerator: [10, 100, 200, 500, 1000],
    // 클러스터 마커의 위치를 클러스터를 구성하고 있는 마커의 평균 좌표로 할 것인지 여부입니다.
    averageCenter: false,
    // 클러스터 마커를 갱신할 때 호출하는 콜백함수입니다. 이 함수를 통해 클러스터 마커에 개수를 표현하는 등의 엘리먼트를 조작할 수 있습니다.
    stylingFunction: function () {
      //console.log
    },
  };

  public _clusters: ICluster[] = [];

  public _mapRelations: any = null;

  public _markerRelations: any[] = [];

  onAdd() {
    const map = this.getMap();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    this._mapRelations = naver.maps.Event.addListener(
      map,
      "idle",
      function (event: any) {
        console.log("event", self);
        //console.log("event", this); // null
        self._onIdle();
      }
    );

    if (this.getMarkers().length > 0) {
      this._createClusters();
      this._updateClusters();
    }
  }

  draw(): void {
    const map = this.getMap();

    if (!this.getMap()) {
      return;
    } else {
      console.log("draw");
    }
  }

  onRemove() {
    naver.maps.Event.removeListener(this._mapRelations);
    this._clearCluster();
    this._mapRelations = null;
  }

  getOptions(key: string): any {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    const options: any = {};
    if (key !== undefined) {
      return _this._options.get(key);
    } else {
      Object.keys(_this.DEFAULT_OPTIONS).forEach(
        (value: string, idx: number) => {
          options[value] = _this.get(value);
        }
      );
      return options;
    }
  }

  setOptions(newOptions: string | IOption | any, value?: any): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    if (typeof newOptions === "string") {
      const key = newOptions;
      _this._options.set(key, value);
    } else {
      const isFirst = value;
      Object.keys(newOptions).forEach((key: string) => {
        if (key !== "map") {
          _this._options.set(key, newOptions[key]);
        }
      });

      if (newOptions.map && !isFirst) {
        _this.setMap(newOptions.map);
      }
    }
  }

  getMinClusterSize(): number {
    return this.getOptions("minClusterSize");
  }

  setMinClusterSize(size: number): void {
    this.setOptions("minClusterSize", size);
  }

  getMaxZoom(): number {
    return this.getOptions("maxZoom");
  }

  setMaxZoom(zoom: number): void {
    this.setOptions("maxZoom", zoom);
  }

  getGridSize(): number {
    return this.getOptions("gridSize");
  }

  setGridSize(size: number): void {
    this.setOptions("gridSize", size);
  }

  getIndexGenerator(): number[] {
    return this.getOptions("indexGenerator");
  }

  setIndexGenerator(indexGenerator: any): void {
    this.setOptions("indexGenerator", indexGenerator);
  }

  getMarkers(): naver.maps.Marker[] {
    return this.getOptions("markers");
  }

  setMarkers(markers: naver.maps.Marker[]): void {
    this.setOptions("markers", markers);
  }

  getIcons(): any[] {
    return this.getOptions("icons");
  }

  setIcons(icons: any[]): void {
    this.setOptions("icons", icons);
  }

  getStylingFunction(): any {
    return this.getOptions("stylingFunction");
  }

  setStylingFunction(func: () => any): void {
    this.setOptions("stylingFunction", func);
  }

  getDisableClickZoom(): boolean {
    return this.getOptions("disableClickZoom");
  }

  setDisableClickZoom(flag: boolean): void {
    this.setOptions("disableClickZoom", flag);
  }

  getAverageCenter(): boolean {
    return this.getOptions("averageCenter");
  }

  setAverageCenter(averageCenter: boolean): void {
    this.setOptions("averageCenter", averageCenter);
  }

  changed(key: string, value: any): void {
    if (!this.getMap()) return;

    switch (key) {
      case "marker":
      case "minClusterSize":
      case "gridSize":
      case "averageCenter":
        this._redraw();
        break;
      case "indexGenerator":
      case "icons":
        this._clusters.forEach(function (cluster) {
          cluster.updateIcon();
        });
        break;
      case "maxZoom":
        this._clusters.forEach(function (cluster) {
          if (cluster.getCount() > 1) {
            cluster.checkByZoomAndMinClusterSize();
          }
        });
        break;
      case "stylingFunction":
        this._clusters.forEach(function (cluster) {
          cluster.updateCount();
        });
        break;
      case "disableClickZoom":
        if (value) {
          this._clusters.forEach(function (cluster) {
            cluster.disableClickZoom();
          });
        } else {
          this._clusters.forEach(function (cluster) {
            cluster.enableClickZoom();
          });
        }

        break;
    }
  }

  _createClusters(): void {
    const map = this.getMap();
    if (!map) {
      return null;
    }

    const bounds = map.getBounds();
    const markers = this.getMarkers();

    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i];
      const position = marker.getPosition();

      if (!bounds.hasPoint(position)) continue;

      const closestCluster = this._getClosestCluster(position);
      closestCluster.addMarker(marker);

      this._markerRelations.push(
        naver.maps.Event.addListener(marker, "dragend", () => {
          this._onDragEng();
        })
      );
    }
  }

  _clearCluster(): void {
    const clusters = this._clusters;

    for (let i = 0; i < clusters.length; i++) {
      clusters[i].destroy();
    }

    naver.maps.Event.removeListener(this._markerRelations);

    this._markerRelations = [];
    this._clusters = [];
  }
  _redraw(): void {
    this._clearCluster();
    this._createClusters();
    this._updateClusters();
  }

  _updateClusters(): void {
    const clusters = this._clusters;
    for (let i = 0; i < clusters.length; i++) {
      clusters[i].updateCluster();
    }
  }

  _onDragEng(): void {
    this._redraw();
  }

  _onIdle(): void {
    this._redraw();
  }

  _getClosestCluster(position: naver.maps.Coord): ICluster {
    const proj = this.getProjection();
    const clusters = this._clusters;
    let closestCluster: ICluster = null;
    let distance = Infinity;

    for (let i = 0; i < clusters.length; i++) {
      const cluster = clusters[i];
      const center = cluster.getCenter();

      if (cluster.isInBounds(position)) {
        const delta = proj.getDistance(center, position);

        if (delta < distance) {
          distance = delta;
          closestCluster = cluster;
        }
      }
    }

    if (!closestCluster) {
      closestCluster = new Cluster(this);
      this._clusters.push(closestCluster);
    }

    return closestCluster;
  }
}

class Cluster implements ICluster {
  constructor(markerClusterer: ClusterLayer) {
    this._markerClusterer = markerClusterer;
    this._clusterCenter;
    this._clusterBounds;
    this._clusterMarker;
    this._clusterMember;
    this._relation;
  }

  public _markerClusterer: ClusterLayer;

  public _clusterCenter: null | naver.maps.Coord = null;

  public _clusterBounds: naver.maps.LatLngBounds = null;

  public _clusterMarker: naver.maps.Marker = null;

  public _relation: any = null;

  public _clusterMember: naver.maps.Marker[] = [];

  addMarker(marker: naver.maps.Marker): void {
    if (this._isMember(marker)) {
      return;
    }

    if (!this._clusterCenter) {
      const position = marker.getPosition();
      this._clusterCenter = position;
      this._clusterBounds = this._calcBounds(position);
    }

    this._clusterMember.push(marker);
  }

  destroy(): void {
    naver.maps.Event.removeListener(this._relation);
    const members = this._clusterMember;

    for (let i = 0; i < members.length; i++) {
      members[i].setMap(null);
    }

    this._clusterMarker.setMap(null);

    this._clusterMarker = null;
    this._clusterCenter = null;
    this._clusterBounds = null;
    this._relation = null;
    this._clusterMember = [];
  }

  getCenter(): naver.maps.Coord {
    return this._clusterCenter;
  }

  getBounds(): naver.maps.LatLngBounds {
    return this._clusterBounds;
  }

  getCount(): number {
    return this._clusterMember.length;
  }

  getClusterMember(): naver.maps.Marker[] {
    return this._clusterMember;
  }

  isInBounds(latlng: naver.maps.LatLng): boolean {
    return this._clusterBounds && this._clusterBounds.hasLatLng(latlng);
  }

  enableClickZoom(): void {
    if (this._relation) return;

    const map = this._markerClusterer.getMap();

    this._relation = naver.maps.Event.addListener(
      this._clusterMarker,
      "click",
      (e) => {
        map.morph(e.coord, map.getZoom() + 1);
      }
    );
    //
  }

  disableClickZoom(): void {
    if (!this._relation) return;
    naver.maps.Event.removeListener(this._relation);
    this._relation = null;
  }

  updateCluster(): void {
    if (!this._clusterMarker) {
      let position;
      if (this._markerClusterer.getAverageCenter()) {
        position = this._calcAverageCenter(this._clusterMember);
      } else {
        position = this._clusterCenter;
      }

      this._clusterMarker = new naver.maps.Marker({
        position: position,
        map: this._markerClusterer.getMap(),
      });

      if (!this._markerClusterer.getDisableClickZoom()) {
        this.enableClickZoom();
      }
    }
    this.updateIcon();
    this.updateCount();
    this.checkByZoomAndMinClusterSize();
  }

  checkByZoomAndMinClusterSize(): void {
    const clusterer = this._markerClusterer;
    const minClusterSize = clusterer.getMinClusterSize();
    const maxZoom = clusterer.getMaxZoom();
    const currentZoom = clusterer.getMap().getZoom();

    if (this.getCount() < minClusterSize) {
      this._showMember();
    } else {
      this._hideMember();

      if (maxZoom <= currentZoom) {
        this._showMember();
      }
    }
  }

  updateCount(): void {
    //const stylingFunction = this._markerClusterer.getStylingFunction();

    const iconElement: any = this._clusterMarker.getIcon();
    const elementString: string = iconElement.content;
    const count = this.getCount();
    this._clusterMarker.setIcon({
      ...iconElement,
      content: `${elementString.split('">')[0]}">${count}${
        elementString.split('">')[1]
      }`,
    });
    //$(iconElement.content).find("div:first-child").text(count);
    //stylingFunction && stylingFunction(this._clusterMarker, this.getCount());
    //const iconArray = this._markerClusterer.getIcons();
    //this._clusterMarker.setIcon(iconArray[this.getCount()]);
  }

  updateIcon(): void {
    const count = this.getCount();
    let index = this._getIndex(count);
    const icons = this._markerClusterer.getIcons();

    index = Math.max(index, 0);
    index = Math.min(index, icons.length - 1);

    this._clusterMarker.setIcon(icons[index]);
  }

  _showMember(): void {
    const map = this._markerClusterer.getMap();
    const marker = this._clusterMarker;
    const members = this._clusterMember;

    for (let i = 0; i < members.length; i++) {
      members[i].setMap(map);
    }

    if (marker) {
      marker.setMap(null);
    }
  }

  _hideMember(): void {
    const map = this._markerClusterer.getMap();
    const marker = this._clusterMarker;
    const members = this._clusterMember;
    for (let i = 0; i < members.length; i++) {
      members[i].setMap(null);
    }

    if (marker && !marker.getMap()) {
      marker.setMap(map);
    }
  }

  _calcBounds(coord: naver.maps.Coord): naver.maps.LatLngBounds {
    const map = this._markerClusterer.getMap();
    const newNe = new naver.maps.LatLng(coord.y, coord.x);
    const newSe = new naver.maps.LatLng(coord.y, coord.x);

    const bounds = new naver.maps.LatLngBounds(newNe, newSe);
    const mapBounds = map.getBounds();
    const proj = map.getProjection();

    const map_max_px = proj.fromCoordToOffset(mapBounds.getMax());
    const map_min_px = proj.fromCoordToOffset(mapBounds.getMin());

    const max_px = proj.fromCoordToOffset(bounds.getNE());
    const min_px = proj.fromCoordToOffset(bounds.getSW());

    const gridSize = this._markerClusterer.getGridSize() / 2;

    max_px.add(gridSize, -gridSize);
    min_px.add(-gridSize, gridSize);

    const max_px_x = Math.min(map_max_px.x, max_px.x);
    const max_px_y = Math.max(map_max_px.y, max_px.y);
    const min_px_x = Math.max(map_max_px.x, min_px.x);
    const min_px_y = Math.min(map_min_px.y, min_px.y);

    const newMax = proj.fromOffsetToCoord(
      new naver.maps.Point(max_px_x, max_px_y)
    );
    const newMin = proj.fromOffsetToCoord(
      new naver.maps.Point(min_px_x, min_px_y)
    );

    const neValue = new naver.maps.LatLng(newMax.y, newMax.x);
    const seValue = new naver.maps.LatLng(newMin.y, newMin.y);

    return new naver.maps.LatLngBounds(seValue, neValue);
  }

  _getIndex(count: number): number {
    const indexGenerator = this._markerClusterer.getIndexGenerator();

    if (indexGenerator instanceof Function) {
      return indexGenerator(count);
    } else if (indexGenerator instanceof Array) {
      let index = 0;
      for (let i = index; i < indexGenerator.length; i++) {
        const factor = indexGenerator[i];
        if (count < factor) break;
        index++;
      }
      return index;
    }
  }

  _isMember(marker: naver.maps.Marker): boolean {
    return this._clusterMember.indexOf(marker) !== -1;
  }

  _calcAverageCenter(markers: naver.maps.Marker[]): naver.maps.Point {
    const numberOfMarkers = markers.length;
    const averageCenter = [0, 0];

    for (let i = 0; i < numberOfMarkers; i++) {
      averageCenter[0] += markers[i].getPosition().x;
      averageCenter[1] += markers[i].getPosition().y;
    }

    averageCenter[0] /= numberOfMarkers;
    averageCenter[1] /= numberOfMarkers;

    return new naver.maps.Point(averageCenter[0], averageCenter[1]);
  }
}

export default ClusterLayer;

//FIX naver.maps.OverlayView 클래스를 상속해야 하는 것 같음.
//draw, onAdd, onRemove 재정의 해야 한다. class로는 안되고, Fucntion으로 대체해야 함.
