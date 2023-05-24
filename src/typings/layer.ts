import type { API } from './api';
import type { GeoJsonCommonStyle, GeoJsonPointStyle, GeoJsonLineStyle, GeoJsonPolygonStyle } from './geojsonStyle';
import type { MapV } from './mapv';

export namespace Layer {
  /**
   * 图层元数据
   */
  export type BasicLayer = {
    layerName: string;
    id: string;
    /** 图层url, geojson加载方式传入geojson */
    url: string;
    /** 请求头 */
    headers?: Record<string, any>;
    /** 可以传自定义url参数，如token等 */
    queryParameters?: Record<string, any>;
    originId?: string;
    /** 地图边界，例：
     * POLYGON((-167.1072 32.0969,-167.1072 69.834,-104.1519 69.834,-104.1519 32.0969,-167.1072 32.0969))
     */
    boundary?: string;
    datasetId?: string;
    /** 地图缩放的范围，如果没有viewPort，从boundary中计算
     * 默认为[110.60396458865515, 34.54408834959379, 15000000]
     */
    viewPort?: number[];
    /** 真实图层名，wms、cog、pbf等加载方式需要此字段，不填则取loaderinfo.layerName， 都无则取layerName，两者可能不一致 */
    sourceLayer?: string;
    /** 缩略图 */
    imageURL?: string;
    /** 数据集图层维度信息 */
    dimensionValue?: any;
    /** 0代表私人用户的，1代表官方认可的 */
    isOfficial?: 0 | 1;
    /** 用于备份atom信息 */
    atomData?: API.Atom;
    /** 用于存放专业图例的字段 */
    proLegends?: string[];
    /** 用于存放自定义图例的字段 */
    customLegend?: LayerLegend;
  }

  export type LoaderInfo = {
    /** 'EPSG: 4326' | 'EPSG: 3857'，默认为3857 */
    srs?: string;
    minimumLevel?: number,
    maximumLevel?: number,
  }

  /**
   * 栅格图层元数据格式
   */
  export type RasterLayerItem = {
    method: 'wms' | 'wmts' | 'tms' | 'tdt' | 'amap' | 'arcgis' | 'pic';
    layerType?: 'raster' | 'ogc';
    /** 是否添加鉴权 */
    addTgt?: boolean;
    /** TMS图层图例 */
    legend?: TMSLegend;
    loaderinfo?: LoaderInfo;
    renderOptions?: RasterOptions;
  } & BasicLayer;

  export type TMSLegend = {
    type: 'polygon' | 'line' | 'point';
    color: string;
    name: string;
  }[];

  export type LegendColor = string | {
    a?: number;
    b: number;
    g: number;
    r: number;
  }

  export type LegendImage = string

  export type PointLegend = {
    type: 'point'
    id?: string
    paint: {
      'circle-color': LegendColor
      'circle-radius'?: number
      'circle-stroke-color'?: LegendColor
      'circle-stroke-width'?: number
    }
    desc: string
  }

  export type LineLegend = {
    type: 'line'
    id?: string
    paint: {
      'line-color': LegendColor
      'line-width'?: number
      /**
       * 虚线长度, 范围0-10
       */
      'line-dasharray'?: number
    }
    desc: string
  }

  export type PolygonLegend = {
    type: 'polygon'
    id?: string
    paint: {
      'fill-color': LegendColor
      'fill-outline-color'?: LegendColor
      'fill-outline-width'?: number
      'fill-pattern'?: LegendImage
    }
    desc: string
  }

  export type IconLegend = {
    type: 'icon'
    id?: string
    paint: {
      'icon-image': LegendImage
      'icon-color'?: LegendColor
      'icon-size'?: number
    }
    desc: string
  }

  export type ColorBarLegend = {
    type: 'colorBar'
    id?: string
    paint: {
      colors: [number, string][]
      max: number
      min: number
      type: "discrete" | 'continuous'
    }
    desc: {
      min: string | number
      max: string | number
    }
  }

  export type CustomLegendItem = PointLegend | LineLegend | PolygonLegend | IconLegend | ColorBarLegend

  export type LayerLegend = {
    name: string
    tip?: string
    legends: CustomLegendItem[]
  }

   /**
   * 以tms方式加载的矢量图层元数据格式
   */
  export type TMSVectorLayerItem = {
    method: 'tms';
    layerType: 'vector';
    renderOptions?: RasterOptions;
    loaderinfo?: LoaderInfo;
  } & BasicLayer;

   /**
   * 以geojosn方式加载的矢量图层元数据格式
   */
  export type GeoJsonLayerItem = {
    /** geojson链接或对象 */
    url: string | GeoJSON.GeoJSON;
    method: 'geojson' | 'primitive';
    layerType?: 'vector';
    /** 列字段信息 */
    columns?: {
      column_name: string;
      data_type: "string" | "number" | 'boolean';
    }[];
    /** geojson信息 */
    summary?: {
      data: Record<string, any>[];
      flatedData: Record<string, any>[];
      type: "polygon" | "line" | "point" | undefined;
      count: number;
      columns: string[][];
      flatedColumns: string[][];
    } | null
  } & GeoJsonOptions & Omit<BasicLayer, 'url'>;

  /**
   * 热力图图层元数据格式
   */
  export type HeatLayerItem = {
    /** 点geojson链接或对象 */
    url: string | GeoJSON.GeoJSON;
    method: 'heat';
    layerType?: 'raster';
    data?: {
      pos: number[]
      properties: Record<string, number>
    }[]
    /** number类型字段(已拍平) */
    columns?: {
      column_name: string;
      data_type: "number";
    }[];
    valueRange?: number[]
    renderOptions?: HeatOptions;
  } & Omit<BasicLayer, 'url'>;

  export type MapVLayerItem = {
    /** 点geojson链接或对象 */
    url: string | GeoJSON.GeoJSON;
    data?: MapV.MapVDataSet;
    method: 'mapv';
    layerType?: 'raster';
    renderOptions?: MapV.MapVOptions;
  } & Omit<BasicLayer, 'url'>;

  /**
   * 以pbf方式加载的矢量图层元数据格式
   */
  export type PbfLayerItem = {
    url: string | Object;
    method: 'pbf';
    originMethod?: 'pbf' | 'geojson';
    layerType?: 'vector';
    geoJsonType?: 'point' | 'line' | 'polygon';
    renderOptions?: PbfOptions;
    /** 列字段信息 */
    columns?: {
      column_name: string;
      data_type: "string" | "number" | 'boolean';
    }[];
    /** pbf style */
    pbfStyle?: any;
  } & Omit<BasicLayer, 'url'>;

  /**
   * 以cog方式加载的栅格图层元数据格式
   */
  export type COGLayerItem = {
    method: 'cog';
    layerType?: 'raster';
    owner?: string;
    renderOptions?: COGOptions
    /** 用于存放cog影像的数值范围 */
    minMax?: number[];
    addTgt?: boolean;
  } & BasicLayer;

  /**
   * nc图层元数据格式
   */
  export type NCLayerItem = {
    method: 'nc';
    layerType?: 'nc'
    /** fields默认为 { lon: 'lon', lat: 'lat', U: 'U', V: 'V'} */
    fields?: {
      lon?: string;
      lat?: string;
      U?: string;
      V?: string;
    }
    /** valueRange默认为{ min: -100, max: 100},即UV纬度值的范围 */
    valueRange?: {
      min?: number;
      max?: number;
    }
    /** 经纬度偏移值,默认为{ lon: 0, lat: 0, lev: 0 } */
    offset?: {
      lon?: number;
      lat?: number;
      lev?: number;
    }
    /** fields 和 valueRange、offset属性可能存放在这里 */
    otherProperties?: string;
    renderOptions?: NCOptions;
  } & BasicLayer;

  /**
   * 3dtiles图层元数据格式
   */
  export type TDTileLayerItem = {
    method: 'tdtiles';
    layerType?: 'tdtiles'
    renderOptions?: TDTileOptions
  } & BasicLayer;

  /**
   * kml图层元数据格式
   */
  export type KMLLayerItem = {
    method: 'kml';
    layerType?: 'kml';
    renderOptions?: KMLOptions;
  } & BasicLayer;

  export type LayerItem = RasterLayerItem | HeatLayerItem | MapVLayerItem | TMSVectorLayerItem | GeoJsonLayerItem | PbfLayerItem | COGLayerItem | NCLayerItem | TDTileLayerItem | KMLLayerItem;

  export type LayerMethod = LayerItem['method'];

  export type LayerType = LayerItem['layerType'];

  export type RenderOptions = LayerItem['renderOptions'];

  //  几类图层的渲染配置
  export type RasterOptions = {
    alpha?: number;
    brightness?: number;
    hue?: number;
    saturation?: number;
    gamma?: number;
    contrast?: number;
  };

  export type HeatOptions = {
    field?: string
    config?: {

      /**
        * The blur factor that will be applied to all datapoints. The higher the
        * blur factor is, the smoother the gradients will be
        * Default value: 0.85
        */
      blur?: number | undefined;

      /**
        * An object that represents the gradient.
        * Syntax: {[key: number in range [0,1]]: color}
        */
      gradient?: string[];

      /**
        * The maximal opacity the highest value in the heatmap will have. (will be
        * overridden if opacity set)
        * Default value: 0.6
        */
      maxOpacity?: number | undefined;

      /**
        * The minimum opacity the lowest value in the heatmap will have (will be
        * overridden if opacity set)
        */
      minOpacity?: number | undefined;

      /**
        * A global opacity for the whole heatmap. This overrides maxOpacity and
        * minOpacity if set
        * Default value: 0.6
        */
      opacity?: number | undefined;

      /**
        * The radius each datapoint will have (if not specified on the datapoint
        * itself)
        */
      radius?: number | undefined;
    },
    autoRadius?: boolean
  }

  /**
   * geojson分类型的渲染配置
   */
  export type GeoJsonOptions = {
    geoJsonType?: 'point',
    renderOptions?: GeoJsonCommonStyle & GeoJsonPointStyle
  } | {
    geoJsonType?: 'line',
    renderOptions?: GeoJsonCommonStyle & GeoJsonLineStyle
  } | {
    geoJsonType?: 'polygon',
    renderOptions?: GeoJsonCommonStyle & GeoJsonPolygonStyle
  }

  export type COGOptions = {
    renderMethod?: 'SingleBand' | 'ThreeBand';
    R?: number;
    G?: number;
    B?: number;
    /**
     * 表示渲染的样式名(可选)，默认值根据layerName参数从数据库fuxi_layer_colormap_map表中获取，也可传入系统默认colormap的名称，或用户自定义colormap的id,若无默认渲染样式&用户未传入样式，默认使用jet渲染方式
     */
    renderStyle?: 'jet' | 'magma' | 'inferno' | 'plasma' | 'viridis' | 'RdBu_r' | 'Greens' | 'YlOrBr' | 'RdYlBu_r' | string;
    /**
     * 自定义的当前cog样式，如果不为空，则renderStyle属性失效
     */
    newRender?: {
      colors: [number, string][];
      max: number;
      min: number;
      type: "discrete" | 'continuous';
    }
    /**
     * 渲染值的范围0 - 1
     */
    valueRange?: {
      min: number;
      max: number;
    };
    nodata?: number;
  } & RasterOptions;

  export type PbfOptions = {
    type?: 'single' | 'section' | 'value' | 'bubble';
    config?: {
      /**
       * 分段和单值渲染的用户自定义样式
       */
      custom?: {
        /**
         * 自定义区间/值
         */
        label: string | number | [number, number];
        /**
         * css颜色
         */
        value: string;
      }[]
      [key: string]: any;
    };
    symbol?: {
      "text-field"?: string;
      "text-size"?: number;
      'text-color'?: {
        a?: number | undefined;
        b: number;
        g: number;
        r: number;
      };
      'text-anchor'?: string;
    };
  } & RasterOptions;

  export type NCOptions = {
    colorBar?: string[];
    maxParticles?: number;
    particleHeight?: number;
    fadeOpacity?: number;
    dropRate?: number;
    dropRateBump?: number;
    speedFactor?: number;
    lineWidth?: number;
    dynamic?: boolean;
    valueRange?: {
      min: number;
      max: number;
    }
  };

  export type TDTileOptions = {
    defaultColor: string;
    conditions?: {
      height: number;
      color: string;
    }[];
    showHeight?: number;
  };

  export type KMLOptions = {
    labelColor?: string[];
  }

  /**
  * 图层管理的数据类型
  */
  export type layerManageItem = {
    layerName: string;
    id: string;
    layer: LayerItem;
    show?: boolean;
    /** 是否开启点击查询，默认为否 */
    enableQuery?: boolean;
    split?: boolean;
  };

  export type TerrainLayer = {
    layerName: string;
    id: string;
    url?: string | null;
    /** 请求头 */
    headers?: Record<string, any>;
    /** 可以传自定义url参数，如token等 */
    queryParameters?: Record<string, any>;
    imageURL?: string;
    options?: {
      /** 水面效果 */
      requestWaterMask?: boolean;
      /** Needed to visualize slope */
      requestVertexNormals?: boolean;
    };
  };

  export type DataSet = {
    name: string;
    id: string;
    filterable?: boolean;
    /** 是否开启自动根据全局时间添加数据集图层功能 */
    autoGeoLayerAdd?: boolean;
    params?: {
      top?: number;
      base?: number;
      spatialWkt?: string | null;
    };
    layers: LayerItem[];
  };
}
