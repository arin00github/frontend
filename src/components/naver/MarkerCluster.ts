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
    //console.log("this", this.getMarkers());

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
    const currentMaxZoom = this.getMaxZoom();
    console.log("currentZoom", currentMaxZoom);

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

  /**
   * 클러스터링 옵션을 반환. key이름을 지정하지 않으면 전체 옵션이 반환
   * @param key 옵션key 이름
   * @returns
   */
  getOptions(key?: string): any {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    const options: any = {};
    if (key !== undefined) {
      return _this.get(key);
    } else {
      Object.keys(_this.DEFAULT_OPTIONS).forEach(
        (value: string, idx: number) => {
          options[value] = _this.get(value);
        }
      );
      return options;
    }
  }

  /**
   * 마커 클러스터링 옵션을 설정합니다
   * @param newOptions 옵션
   * @param value
   */
  setOptions(newOptions: string | IOption | any, value?: any): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    if (typeof newOptions === "string") {
      const key = newOptions;
      _this.set(key, value);
    } else {
      const isFirst = value;
      Object.keys(newOptions).forEach((key: string) => {
        if (key !== "map") {
          _this.set(key, newOptions[key]);
        }
      });

      if (newOptions.map && !isFirst) {
        _this.setMap(newOptions.map);
      }
    }
  }

  /**
   * 클러스터를 구성하는 최소 마커 수를 반환합니다.
   * @return {number} 클러스터를 구성하는 최소 마커 수
   */
  getMinClusterSize(): number {
    return this.getOptions("minClusterSize");
  }

  /**
   * 클러스터를 구성하는 최소 마커 수를 설정합니다.
   * @param {number} size 클러스터를 구성하는 최소 마커 수
   */
  setMinClusterSize(size: number): void {
    this.setOptions("minClusterSize", size);
  }

  /**
   * 클러스터 마커를 노출할 최대 줌 레벨을 반환합니다.
   * @return {number} 클러스터 마커를 노출할 최대 줌 레벨
   */
  getMaxZoom(): number {
    return this.getOptions("maxZoom");
  }

  /**
   * 클러스터 마커를 노출할 최대 줌 레벨을 설정합니다.
   * @param {number} zoom 클러스터 마커를 노출할 최대 줌 레벨
   */
  setMaxZoom(zoom: number): void {
    this.setMaxZoom(zoom);
    this.setOptions("maxZoom", zoom);
  }

  /**
   * 클러스터를 구성할 그리드 크기를 반환합니다. 단위는 픽셀입니다.
   * @return {number} 클러스터를 구성할 그리드 크기
   */
  getGridSize(): number {
    return this.getOptions("gridSize");
  }

  /**
   * 클러스터를 구성할 그리드 크기를 설정합니다. 단위는 픽셀입니다.
   * @param {number} size 클러스터를 구성할 그리드 크기
   */
  setGridSize(size: number): void {
    this.setOptions("gridSize", size);
  }

  /**
   * 클러스터 마터의 아이콘을 결정하는 인덱스 생성기를 반환
   * @returns 인덱스 생성기
   */
  getIndexGenerator(): number[] {
    return this.getOptions("indexGenerator");
  }

  /**
   * 클러스터 마커의 아이콘을 결정하는 인덱스 생성기를 설정합니다.
   * @param {Array | Function} indexGenerator 인덱스 생성기
   */
  setIndexGenerator(indexGenerator: any): void {
    this.setOptions("indexGenerator", indexGenerator);
  }

  /**
   * 클러스터로 구성할 마커를 반환합니다.
   * @return {Array.<naver.maps.Marker>} 클러스터로 구성할 마커
   */
  getMarkers(): naver.maps.Marker[] {
    return this.getOptions("markers");
  }

  /**
   * 클러스터로 구성할 마커를 설정합니다.
   * @param {Array.<naver.maps.Marker>} markers 클러스터로 구성할 마커
   */
  setMarkers(markers: naver.maps.Marker[]): void {
    this.setOptions("markers", markers);
  }

  /**
   * 클러스터 마커 아이콘을 반환합니다.
   * @return {Array.<naver.maps.Marker~ImageIcon | naver.maps.Marker~SymbolIcon | naver.maps.Marker~HtmlIcon>} 클러스터 마커 아이콘
   */
  getIcons(): any[] {
    return this.getOptions("icons");
  }

  /**
   * 클러스터 마커 아이콘을 설정합니다.
   * @param {Array.<naver.maps.Marker~ImageIcon | naver.maps.Marker~SymbolIcon | naver.maps.Marker~HtmlIcon>} icons 클러스터 마커 아이콘
   */
  setIcons(icons: any[]): void {
    this.setOptions("icons", icons);
  }

  /**
   * 클러스터 마커의 엘리먼트를 조작할 수 있는 스타일링 함수를 반환합니다.
   * @return {Funxtion} 콜백함수
   */
  getStylingFunction(): any {
    return this.getOptions("stylingFunction");
  }

  /**
   * 클러스터 마커의 엘리먼트를 조작할 수 있는 스타일링 함수를 설정합니다.
   * @param {Function} func 콜백함수
   */
  setStylingFunction(func: () => any): void {
    this.setOptions("stylingFunction", func);
  }

  /**
   * 클러스터 마커를 클릭했을 때 줌 동작 수행 여부를 반환합니다.
   * @return {boolean} 줌 동작 수행 여부
   */
  getDisableClickZoom(): boolean {
    return this.getOptions("disableClickZoom");
  }

  /**
   * 클러스터 마커를 클릭했을 때 줌 동작 수행 여부를 설정합니다.
   * @param {boolean} flag 줌 동작 수행 여부
   */
  setDisableClickZoom(flag: boolean): void {
    this.setOptions("disableClickZoom", flag);
  }

  /**
   * 클러스터 마커의 위치를 클러스터를 구성하고 있는 마커의 평균 좌표로 할 것인지 여부를 반환합니다.
   * @return {boolean} 평균 좌표로 클러스터링 여부
   */
  getAverageCenter(): boolean {
    return this.getOptions("averageCenter");
  }

  /**
   * 클러스터 마커의 위치를 클러스터를 구성하고 있는 마커의 평균 좌표로 할 것인지 여부를 설정합니다.
   * @param {boolean} averageCenter 평균 좌표로 클러스터링 여부
   */
  setAverageCenter(averageCenter: boolean): void {
    this.setOptions("averageCenter", averageCenter);
  }

  // KVO 이벤트 핸들러
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

  /**
   * 현재 지도 경계 영역 내의 마커에 대해 클러스터를 생성합니다.
   * @private
   */
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

      if (!bounds.hasPoint(position)) {
        continue;
      }

      const closestCluster = this._getClosestCluster(position);
      closestCluster.addMarker(marker);

      this._markerRelations.push(
        naver.maps.Event.addListener(marker, "dragend", () => {
          this._onDragEng();
        })
      );
    }
  }

  /**
   * 클러스터를 모두 제거합니다.
   * @private
   */
  _clearCluster(): void {
    const clusters = this._clusters;

    for (let i = 0; i < clusters.length; i++) {
      clusters[i].destroy();
    }

    naver.maps.Event.removeListener(this._markerRelations);

    this._markerRelations = [];
    this._clusters = [];
  }

  /**
   * 생성된 클러스터를 모두 제거하고, 다시 생성합니다.
   * @private
   */
  _redraw(): void {
    this._clearCluster();
    this._createClusters();
    this._updateClusters();
  }

  /**
   * 클러스터의 아이콘, 텍스트를 갱신합니다.
   * @private
   */
  _updateClusters(): void {
    const clusters = this._clusters;
    for (let i = 0; i < clusters.length; i++) {
      clusters[i].updateCluster();
    }
  }

  /**
   * 각 마커의 드래그 종료 이벤트 핸들러입니다.
   */
  _onDragEng(): void {
    this._redraw();
  }

  /**
   * 지도의 Idle 상태 이벤트 핸들러입니다.
   */
  _onIdle(): void {
    this._redraw();
  }

  /**
   * 전달된 위/경도에서 가장 가까운 클러스터를 반환합니다. 없으면 새로 클러스터를 생성해 반환합니다.
   * @param {naver.maps.Coord} position 위/경도
   * @return {ICluster} 클러스터
   */
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
      //console.log("cluster addition");
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

  /**
   * 클러스터에 마커를 추가합니다.
   * @param {naver.maps.Marker} marker 클러스터에 추가할 마커
   */
  addMarker(marker: naver.maps.Marker): void {
    if (this._isMember(marker)) {
      return;
    }

    if (!this._clusterCenter) {
      const position = marker.getPosition();
      //console.log(position);
      this._clusterCenter = position;
      this._clusterBounds = this._calcBounds(position);
      // console.log(this._clusterBounds);
      // const rect = new naver.maps.Rectangle({
      //   bounds: this._clusterBounds,
      //   fillColor: "red",
      //   fillOpacity: 0.3,
      //   strokeColor: "red",
      //   strokeOpacity: 1,
      // });

      // const map = this._markerClusterer.getMap();
      // rect.setMap(map);
    }

    this._clusterMember.push(marker);
  }

  /**
   * 클러스터를 제거합니다.
   */
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

  /**
   * 클러스터 중심점을 반환합니다.
   * @return {naver.maps.Coord} 클러스터 중심점
   */
  getCenter(): naver.maps.Coord {
    return this._clusterCenter;
  }

  /**
   * 클러스터 경계 영역을 반환합니다.
   * @return {naver.maps.LatLngBounds} 클러스터 경계 영역
   */
  getBounds(): naver.maps.LatLngBounds {
    return this._clusterBounds;
  }

  /**
   * 클러스터를 구성하는 마커 수를 반환합니다.
   * @return {number} 클러스터를 구성하는 마커 수
   */
  getCount(): number {
    return this._clusterMember.length;
  }

  /**
   * 현재의 클러스터 멤버 마커 객체를 반환합니다.
   * @return {naver.maps.Marker[]} 클러스터를 구성하는 마커 객체 집합
   */
  getClusterMember(): naver.maps.Marker[] {
    return this._clusterMember;
  }

  /**
   * 전달된 위/경도가 클러스터 경계 영역 내에 있는지 여부를 반환합니다.
   * @param {naver.maps.LatLng} latlng 위/경도
   * @return {boolean} 클러스터 경계 영역 내의 위치 여부
   */
  isInBounds(latlng: naver.maps.LatLng): boolean {
    return this._clusterBounds && this._clusterBounds.hasLatLng(latlng);
  }

  /**
   * 클러스터 마커 클릭 시 줌 동작을 수행하도록 합니다.
   */
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

  /**
   * 클러스터 마커 클릭 시 줌 동작을 수행하지 않도록 합니다.
   */
  disableClickZoom(): void {
    if (!this._relation) return;
    naver.maps.Event.removeListener(this._relation);
    this._relation = null;
  }

  /**
   * 클러스터 마커가 없으면 클러스터 마커를 생성하고, 클러스터 마커를 갱신합니다.
   * - 클러스터 마커 아이콘
   * - 마커 개수
   * - 클러스터 마커 노출 여부
   */
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

  /**
   * 조건에 따라 클러스터 마커를 노출하거나, 노출하지 않습니다.
   */
  checkByZoomAndMinClusterSize(): void {
    const clusterer = this._markerClusterer;
    const minClusterSize = clusterer.getMinClusterSize();
    const maxZoom = clusterer.getMaxZoom();
    const currentZoom = clusterer.getMap().getZoom();
    //console.log(this.getCount(), minClusterSize);

    if (this.getCount() < minClusterSize) {
      this._showMember();
    } else {
      this._hideMember();

      if (maxZoom <= currentZoom) {
        this._showMember();
      }
    }
  }

  /**
   * 클러스터를 구성하는 마커 수를 갱신합니다.
   */
  updateCount(): void {
    const iconElement: any = this._clusterMarker.getIcon();
    const elementString: string = iconElement.content;
    const count = this.getCount();
    this._clusterMarker.setIcon({
      ...iconElement,
      content: `${elementString.split('">')[0]}">${count}${
        elementString.split('">')[1]
      }`,
    });
  }

  /**
   * 클러스터 마커 아이콘을 갱신합니다.
   */
  updateIcon(): void {
    const count = this.getCount();
    let index = this._getIndex(count);
    const icons = this._markerClusterer.getIcons();

    index = Math.max(index, 0);
    index = Math.min(index, icons.length - 1);

    this._clusterMarker.setIcon(icons[index]);
  }

  /**
   * 클러스터를 구성하는 마커를 노출합니다. 이때에는 클러스터 마커를 노출하지 않습니다.
   * @private
   */
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

  /**
   * 클러스터를 구성하는 마커를 노출하지 않습니다. 이때에는 클러스터 마커를 노출합니다.
   * @private
   */
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

  /**
   * 전달된 위/경도를 중심으로 그리드 크기만큼 확장한 클러스터 경계 영역을 반환합니다.
   * @param {naver.maps.Coord} position 위/경도
   * @return {naver.maps.LatLngBounds} 클러스터 경계 영역
   * @private
   */
  _calcBounds(coord: naver.maps.Coord): naver.maps.LatLngBounds {
    const map = this._markerClusterer.getMap();
    const newNe = new naver.maps.LatLng(coord.y, coord.x);
    const newSe = new naver.maps.LatLng(coord.y, coord.x);

    const bounds = new naver.maps.LatLngBounds(newNe, newSe);
    const mapBounds = map.getBounds();
    const proj = map.getProjection();

    const newNe2 = new naver.maps.LatLng(mapBounds.maxY(), mapBounds.maxX());
    const newSe2 = new naver.maps.LatLng(mapBounds.minY(), mapBounds.minX());

    const map_max_px = proj.fromCoordToOffset(newNe2);
    const map_min_px = proj.fromCoordToOffset(mapBounds.getMin());

    const max_px = proj.fromCoordToOffset(bounds.getNE());
    const min_px = proj.fromCoordToOffset(bounds.getSW());

    const gridSize = this._markerClusterer.getGridSize() / 2;

    max_px.add(gridSize, -gridSize);
    min_px.add(-gridSize, gridSize);

    const max_px_x = Math.min(map_max_px.x, max_px.x);
    const max_px_y = Math.max(map_max_px.y, max_px.y);
    const min_px_x = Math.max(map_min_px.x, min_px.x);
    const min_px_y = Math.min(map_min_px.y, min_px.y);

    const newMax = proj.fromOffsetToCoord(
      new naver.maps.Point(max_px_x, max_px_y)
    );
    const newMin = proj.fromOffsetToCoord(
      new naver.maps.Point(min_px_x, min_px_y)
    );

    const neValue = new naver.maps.LatLng(newMax.y, newMax.x);
    const swValue = new naver.maps.LatLng(newMin.y, newMin.x);

    return new naver.maps.LatLngBounds(swValue, neValue);
  }

  /**
   * 클러스터를 구성하는 마커 수에 따라 노출할 아이콘을 결정하기 위한 인덱스를 반환합니다.
   * @param {number} count 클러스터를 구성하는 마커 수
   * @return {number} 인덱스
   * @private
   */
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

  /**
   * 전달된 마커가 이미 클러스터에 속해 있는지 여부를 반환합니다.
   * @param {naver.maps.Marker} marker 마커
   * @return {boolean} 클러스터에 속해 있는지 여부
   * @private
   */
  _isMember(marker: naver.maps.Marker): boolean {
    return this._clusterMember.indexOf(marker) !== -1;
  }

  /**
   * 전달된 마커들의 중심 좌표를 반환합니다.
   * @param {Array.<naver.maps.Marker>} markers 마커 배열
   * @return {naver.maps.Point} 마커들의 중심 좌표
   * @private
   */
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
