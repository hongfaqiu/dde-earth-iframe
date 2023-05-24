export declare namespace GeojsonStyle {
  interface RGBColor {
    a?: number | undefined;
    b: number;
    g: number;
    r: number;
  }
  
  type GeoJsonCommonStyle = {
    symbol?: SymbolStyle; // 标签
  }
  
  type GeoJsonColor = RGBColor | string
  
  /**
   * geojson渲染方案
   */
  type GeoJsonStyle = GeoJsonCommonStyle & (GeoJsonPointStyle | GeoJsonLineStyle | GeoJsonPolygonStyle)
  
  /**
   * 标签渲染条件
   */
  type SymbolStyle = {
    "text-field"?: string;
    "text-font"?: string;
    "text-size"?: number;
    'text-color'?: GeoJsonColor;
    'text-halo-color'?: GeoJsonColor;
    'text-halo-width'?: number;
  }
  
  /**
   * 分段和单值渲染的用户自定义样式
   */
  type CustomStyle = {
    /**
     * 自定义区间/值
     */
    label: string | number | [number, number];
    /**
     * css颜色
     */
    value: string;
   }[]
  
  
  /**
   * 点渲染方案, 共计五种
   */
  type GeoJsonPointStyle = (PointSingleStyle | PointSectionStyle | PointValueStyle | PointBubbleStyle) & {
    cluster?: ClusterOptions
  } | PointHeightStyle
  
  /**
   * 点通用渲染条件
   */
  type PointCommonOptions = {
    custom?: CustomStyle;
    'circle-stroke-color'?: GeoJsonColor | undefined;
    'circle-stroke-width'?: number | undefined;
    opacity?: number;
  }
  
  /**
   * 点聚类渲染条件
   */
  type ClusterOptions = {
    enable?: boolean
    pixelRange?: number
    minimumClusterSize?: number
  }
  
  type PointSingleStyle = {
    type: 'single',
    // 精灵图
    sprite?: {
      url: string;
      params?: Record<string, any>
    }
    config: {
      'label-type'?: 'vector' | 'icon';
      color?: GeoJsonColor;
      'icon-image'?: string;
      'label-size'?: number;
      'icon-size'?: number;
    } & PointCommonOptions
  }
  
  type PointSectionStyle = {
    type: 'section',
    config: {
      field?: string;
      'section-type'?: 'natural' | 'average';
      color?: string[];
      'label-size'?: number;
    } & PointCommonOptions
  }
  
  type PointValueStyle = {
    type: 'value',
    config: {
      field?: string;
      color?: string[];
      'label-size'?: number;
    } & PointCommonOptions
  }
  
  type PointBubbleStyle = {
    type: 'bubble',
    config: {
      field?: string;
      'section-type': 'natural' | 'average';
      'section-num': number;
      'label-size': number[];
      'fill-type': 'single' | 'multi';
      color?: GeoJsonColor;
      colors?: string[];
    } & PointCommonOptions
  }
  
  type PointHeightStyle = {
    type: 'height',
    config: {
      field?: string;
      'section-type'?: 'natural' | 'average';
      color?: string[];
      'radius-size'?: number;
      'height-range': [number, number];
    } & PointCommonOptions
  }
  
  /**
   * 线渲染方案, 共计三种
   */
  type GeoJsonLineStyle = (LineSingleStyle | LineSectionStyle | LineValueStyle)
  
  /**
   * 线通用渲染条件
   */
  type LineCommonOptions = {
    custom?: CustomStyle;
    'line-width'?: number;
    opacity?: number;
  }
  
  type LineSingleStyle = {
    type: 'single',
    config: {
      color?: GeoJsonColor;
    } & LineCommonOptions
  }
  
  type LineSectionStyle = {
    type: 'section',
    config: {
      field?: string;
      'section-type'?: 'natural' | 'average';
      color?: string[];
    } & LineCommonOptions
  }
  
  type LineValueStyle = {
    type: 'value',
    config: {
      field?: string;
      color?: string[];
    } & LineCommonOptions
  }
  
  /**
   * 面渲染方案, 共计三种
   */
  type GeoJsonPolygonStyle = (PolygonSingleStyle | PolygonSectionStyle | PolygonValueStyle | PolygonHeightStyle)
  
  /**
   * 面通用渲染条件
   */
  type PolygonCommonOptions = {
    custom?: CustomStyle;
    opacity?: number;
    'outline-color'?: GeoJsonColor;
    'outline-width'?: number;
  }
  
  type PolygonSingleStyle = {
    type: 'single',
    config: {
      color?: GeoJsonColor;
    } & PolygonCommonOptions
  }
  
  type PolygonSectionStyle = {
    type: 'section',
    config: {
      field?: string;
      'section-type'?: 'natural' | 'average';
      color?: string[];
    } & PolygonCommonOptions
  }
  
  type PolygonValueStyle = {
    type: 'value',
    config: {
      field?: string;
      color?: string[];
    } & PolygonCommonOptions
  }
  
  type PolygonHeightStyle = {
    type: 'height',
    config: {
      field?: string;
      'section-type'?: 'natural' | 'average';
      color?: string[]
      'height-range': [number, number];
    } & PolygonCommonOptions
  }
}