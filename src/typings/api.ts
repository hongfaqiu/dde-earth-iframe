export declare namespace API {
  type LayerMethod =
    | 'COG'
    | 'WMS'
    | 'WMTS'
    | 'ARCGIS'
    | 'TMS'
    | 'TDT'
    | 'AMAP'
    | 'GEOJSON'
    | 'TDTILES'
    | 'NC'
    | 'PBF';
  type LayerType = 'VECTOR' | 'TMS' | 'TDTILES' | 'NC' | 'RASTER';

  type LayerStandard = 'WMTS' | 'TMS' | 'WMS' | 'COG_TIF' | 'TILES_3D' | 'PIC' | 'KML';
  
  type LayerFormat =
    | 'MAPBOX_VECTOR_TILE'
    | 'UTFGRID'
    | 'PNG'
    | 'JPEG'
    | 'GEOJSON'
    | 'TOPOJSON'
    | 'GIF'
    | 'b3dm'
    | 'i3dm'
    | 'pnts'
    | 'cmpt'
    | 'KML';
  
  type LayerInfo = {
    type?: LayerType | null;
    method?: LayerMethod | null;
    standard: LayerStandard | null;
    format: LayerFormat | null;
    customLegend?: any;
    renderOptions?: any;
    url: string;
    sourceLayer: string;
    imageURL?: string | null;
    srs?: string;
    proLegends?: string[] | null;
    tmsLegend?: {
      type: 'polygon' | 'line' | 'point';
      color: string;
      name: string;
    }[];
    geoJsonType?: 'point' | 'line' | 'polygon' | null;
    // nc专用
    fields?: {
      // fields默认为 { lon: 'lon', lat: 'lat', U: 'U', V: 'V'}
      lon?: string;
      lat?: string;
      U?: string;
      V?: string;
    } | null;
    valueRange?: {
      // valueRange默认为{ min: -100, max: 100},即UV纬度值的范围
      min?: number;
      max?: number;
    } | null;
    offset?: {
      // 经纬度偏移值,默认为{ lon: 0, lat: 0, lev: 0 };
      lon?: number;
      lat?: number;
      lev?: number;
    } | null;
  };

  type Atom = {
    filePath: string | null;
    id: number;
    uid: string;
    name: string;
    dataType: string;
    atomType: 'LAYER_SERVICE' | 'JDBC' | 'HTTP';
    userId: string;
    privilege: string | null;
    status: string | null;
    isOfficial: 0 | 1;
    browseGraph: string | null;
    keyword: string | null;
    taskId?: string | null;
    boundaryWKT: string | null;
    coordinateReference?: string | null;
    projection?: string | null;
    owner: string | null;
    fields: {
      type: string;
      simpleType?: 'NUMBER' | 'STRING' | 'GEOMETRY' | 'USER_DEFINED';
      layered: boolean;
      fieldName: string;
    }[];
    space: {
      coordinateSystem: string;
      type?: string;
      resolution: string;
      elevation?: string;
      extent: {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
      };
      geoIdentifier?: string;
    } | null;
    temporal: {
      geologicTime: string | null;
      geologicAge: string | null;
      base: number;
      top: number;
      gtsVersion: string | null;
    } | null;
    intellectualProp?: string | null;
    intellectualGraph?: string | null;
    license?: string | null;
    createTime: number;
    updateTime: number;
    layerServiceInfo: LayerInfo;
  };
}