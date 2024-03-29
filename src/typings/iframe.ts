import type { Layer } from './layer';
import type { API } from './api';

export declare namespace Iframe {
  type Language =
    /** 英语 */
    'en-US' |
    /** 简体中文 */
    'zh-CN' |
    /** 德语 */
    'de-DE' |
    /** 法语 */
    'fr-FR' |
    /** 西班牙语 */
    'es-ES' |
    /** 俄语 */
    'ru-RU' |
    /** 阿拉伯语 */
    'ar-EG'
  
  type EventType =
    | 'LEFT_DOWN'
    | 'LEFT_UP'
    | 'LEFT_CLICK'
    | 'LEFT_DOUBLE_CLICK'
    | 'RIGHT_DOWN'
    | 'RIGHT_UP'
    | 'RIGHT_CLICK'
    | 'MIDDLE_DOWN'
    | 'MIDDLE_UP'
    | 'MIDDLE_CLICK'
    | 'MOUSE_MOVE'
    | 'WHEEL'
    | 'PINCH_START'
    | 'PINCH_MOVE'
    | 'PINCH_END';
  
  type Event = {
    'addAtom': {
      atom: API.Atom;
      /** 默认都为true */
      options?: {
        /** 添加后是否显示 */
        show?: boolean;
        /** 是否显示添加成功/失败信息 */
        showMessage?: boolean;
        /** 添加完成后是否缩放到地图范围，
         * 栅格方式加载需设置boundary或viewPort属性，否则缩放到默认范围
         */
        zoom?: boolean;
        /** 添加到某个id图层下方 */
        topLayerId?: string;
      };
    };
    'addLayer': {
      layer: Layer.LayerItem;
      options?: {
        /** 添加后是否显示，默认为true */
        show?: boolean;
        /** 是否显示添加成功/失败信息，默认为true */
        showMessage?: boolean;
        /** 添加完成后是否缩放到地图范围，默认为false
         * 栅格方式加载需设置boundary或viewPort属性，否则缩放到默认范围
         */
        zoom?: boolean;
        /** 添加到某个id图层下方 */
        topLayerId?: string;
      };
    };
    'removeLayer': {
      id: string;
      /** 默认都为true */
      options?: {
        /** 是否显示移除成功/失败信息 */
        showMessage?: boolean;
      };
    };
    'moveLayerById': {
      sourceId: string;
      targetId: string;
    };
    'addDataSet': Layer.DataSet | {
      name: string;
      id: string;
    };
    'removeDataSet': {
      id: string;
    };
    'addPoints': {
      /** 如果重复,会被覆盖 */
      id: string;
      positions: number[][];
      style?: {
        /** 点颜色 */
        color?: string;
        /** 点大小 */
        pixelSize?: number;
        outlineColor?: string;
        outlineWidth?: number;
      };
      /** 属性 */
      properties?: Record<string, any>;
    };
    'removePoints': {
      id: string;
    };
    /** 即将废弃, 请使用openTool方法替换 */
    'componentConfig': {
      layerManage?: {
        datasetManage?: {
          disableRemove?: boolean;
          hideLayerPlayer?: boolean;
        };
        /** 面板定位，默认[20, 20] */
        position?: {
          x?: number;
          y?: number
        }
      };
      showLegend?: boolean;
    };
    'mapConfig': {
      /** 国际化语言 */
      language?: Language;
      /** 2为二维, 3为三维, 1为2.5D */
      displayMode?: 1 | 2 | 3;
      /** 是否显示大气 */
      skyAtmosphere?: boolean;
      /** 水汽含量 */
      fogDensity?: number;
      /** 无底图时的纯色背景css颜色, 默认为#4F4F4F */
      baseColor?: string;
      /** 底图 */
      baseMap?: Layer.LayerItem;
      /** 注记 */
      annotationMap?: Layer.LayerItem;
      /** 地形 */
      terrain?: Layer.TerrainLayer;
      /** 是否显示经纬度指示 */
      lonlatIndicator?: boolean;
      /** 是否显示二三维切换按钮 */
      viewerModeSwitch?: boolean;
      /** 是否显示地图请求进度条 */
      ajaxBar?: boolean;
      /** 是否显示量算按钮 */
      measureTool?: boolean;
      /** 是否显示导航控件 */
      navigator?: boolean;
      /** 是否显示信息条 */
      mapStatusBar?: boolean;
      /** 是否显示帧数控件 */
      showFrames?: boolean;
      /** 显示效果,与性能有关,数值0-1,越大越精细 */
      performance?: number;
      /** 地形拉伸系数 */
      terrainExaggeration?: number;
      /** 是否显示经纬网 */
      graticules?: boolean;
      /** 是否开启FXAA抗锯齿 */
      antiAliasing?: boolean;
      /** 版权信息 intellectualGraphVis是否展示 默认展示 intellectualGraphPos展示位置 不传默认是右下 */
      intellectualGraphVis?: boolean;
      intellectualGraphPos?: 'leftBottom' | 'rightBottom';
      /** 是否显示卷帘工具 */
      layerCompareTool?: boolean;
      /** 地球的背景色 */
      backgroundColor?: string;
      /** 是否显示图例工具 */
      legendSwitchTool?: boolean;
      /** 是否显示图例 */
      showLegend?: boolean;
      /** 是否显示地名查询工具 */
      geocoderTool?: boolean;
    };
    'cartography': {
      show: boolean;
      rzpj?: string; // 鉴权
    };
    'openTool': {
      tool:
      | 'geoReconstruct' //古地理重建工具
      | 'layerVideo' // 图集播放工具
      | 'customLayer' // 自定义添加图层
      | 'customGeoJson' // 自定义创建geojson
      | 'depthDataClip' // 深部数据裁剪
      | 'contourLine' // 等高线地形分析
      | 'COG2Terrain' // 栅格cog转地形
      | 'ImgToAudio' // 图像转声音
      | 'layerManager' //图层管理
      | 'datasetManager' // 数据集管理

      /** 默认为true,打开工具 */
      show?: boolean;

      /** 工具面板的样式，默认定位到左上角 */
      style?: {
        right?: number;
        left?: number;
        top?: number;
        bottom?: number;
        [key: string]: any;
      };
      /** 工具面板内容的样式 */
      contentStyle?: any;
      /** 工具面板拖拽限制 */
      bounds?: {
        right?: number;
        left?: number;
        top?: number;
        bottom?: number;
      };
    };
    'renderLayer': {
      id: string;
      options: Layer.RenderOptions;
      /** 强制以某种方式进行渲染 */
      forceMethod?: Layer.LayerMethod;
    };
    'spatialQuery': {
      /** 矢量图层的id, 每次只能开启一个图层的查询，填写''即为关闭空间查询 */
      id: string;
    };
    'cogQuery': {
      /** cog图层的id */
      id: string;
      /** 是否开启查询 */
      enable: boolean;
    };
    'drawer': {
      /** 绘制的图形类型 */
      type: 'POLYGON' | 'POLYLINE' | 'POINT' | 'CIRCLE' | 'RECTANGLE';
      /** 画图工具方法 */
      operate: 'start' | 'destroy';
      drawOptions?: {
        /**
         * 是否使用地形，当开启时需要浏览器支持地形选取功能，如果不支持将会被关闭
         */
        terrain?: boolean;
        /**
         * 操作方式
         */
        operateType?: {
          /**
           * @desc 勾画开始事件
           * @type EventType
           * @default LEFT_CLICK
           */
          START?: EventType;
          /**
           * @desc 勾画移动事件
           * @type EventType
           * @default MOUSE_MOVE
           */
          MOVING?: EventType;
          /**
           * @desc 勾画撤销事件
           * @type EventType
           * @default RIGHT_CLICK
           */
          CANCEL?: EventType;
          /**
           * @desc 勾画结束事件
           * @type EventType
           * @default LEFT_DOUBLE_CLICK
           */
          END?: EventType;
        };
        /** 勾画时的鼠标提示文字 */
        tips?: {
          init?: string | Element;
          start?: string | Element;
          end?: string | Element;
        };
      };
      /**
       * 是否只勾画一次，如果设为true，则在第一勾画结束时停止
       * @default undefined
       */
      once?: boolean;
      /**
       * @desc 是否使用单例模式，如果开启，当勾画第二个图形时会销毁第一个图形
       */
      oneInstance?: boolean;
    };
    'zoomTo': ({
      type: 'layer';
      /** 图层id */
      id: string;
    } | {
      type: 'viewPort';
      /** 视点, [lon, lat, height] */
      viewPort: number[];
    } | {
      type: 'home';
    }) & {
      /** 动画时长, 默认1s */
      duration?: number;
    };
    'get:mapConfig': undefined;
    'get:layers': undefined;
    'get:dataset': undefined;
  }
}
