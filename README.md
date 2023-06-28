# dde-earth-iframe

[![gzip size](https://img.shields.io/bundlephobia/minzip/dde-earth-iframe)](https://unpkg.com/dde-earth-iframe) ![npm latest version](https://img.shields.io/npm/v/dde-earth-iframe.svg) ![license](https://img.shields.io/npm/l/dde-earth-iframe)

这是一个用于在网页中嵌入DDE-Earth Iframe的npm包。
在TypeScript环境下，可以免去查阅操作手册的麻烦。

[![CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/dde-earth-iframe-z01sy2)

## 安装

使用 npm 安装：

```bash
npm install dde-earth-iframe --save
```

## 使用

```ts
import EarthIframe from 'dde-earth-iframe';

const container = document.getElementById('container');

const earthIframe = new EarthIframe(container);

// 等待初始化完成
await earthIframe.loadPromise;

// 示例: 添加事件监听
const eventId = earthIframe.addEventListener('layer:remove', (res, type) => {
  console.log(type, res);
});

// 示例: 移除事件监听
earthIframe.removeEventListener(eventId);

// 示例: 调用方法
const res = await earthIframe.dispatch('addLayer', {
  layer: {
    // 图层配置...
  },
  options: {
    // 选项配置...
  },
});

// 示例: 销毁实例
earthIframe.destroy();
```

## 浏览器使用

```html
<body>
  <div id="iframeContainer"></div>
</body>

<script src="//unpkg.com/dde-earth-iframe@latest"></script>

<script>
  const EarthIframeObj = new EarthIframe("iframeContainer");
</script>
```

## API

### EarthIframe

```ts
class EarthIframe {
  loadPromise: Promise<this>;
  /**
   * 加载地球iframe
   * @param container 容器元素或容器元素id
   * @param opts 配置项
   */
  constructor(container: HTMLElement | string, opts?: Partial<EarthIframeOptions>);
  get loaded(): boolean;
  get isDestroy(): boolean;
  /**
   * 添加事件监听
   * @param type 事件类型
   * @param callback 回调函数
   * @param opts 配置项
   * @param opts.once 是否只执行一次回调并移除监听事件, 默认false
   * @param opts.match 是否匹配返回值中的extra参数, 只有extra和id相等时才执行回调函数, 默认flase
   * @param opts.id 自定义事件的唯一id, 重复则覆盖, 默认生成随机id
   * @returns 监听事件的唯一id
   */
  addEventListener<T extends keyof IframeListener.Event>(type: T, callback: (res: IframeListener.Event[T], type?: T) => any, opts?: {
      once?: boolean;
      match?: boolean;
      id?: string;
  }): string;
  /**
   * 移除事件监听
   * @param id 监听事件的唯一id
   */
  removeEventListener(id: string): void;
  /**
   * 发送事件
   * @param type 事件类型
   * @param body 事件参数
   * @returns Promise
   */
  dispatch<T extends keyof Iframe.Event>(type: T, body: Iframe.Event[T]): Promise<IframeListener.Event[T]>;
  /**
   * 销毁实例
   */
  destroy(): void;
}
```

### Iframe初始化配置项

```ts
type EarthIframeOptions = {
  /** iframe url, defaults to "https://deep-time.org/map/#/showcase" */
  baseUrl?: string;
} & Iframe.Event['mapConfig'];
```

### 可手动触发的Iframe事件

```ts
namespace Iframe {
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
      intellectualGraphPos?: 'leftBottom' | 'rightBottom'
    };
    'cartography': {
      show: boolean;
      rzpj?: string; // 鉴权
    };
    'openTool': {
      tool:
      | 'geoReconstruct' //古地理重建工具
      | 'layerSplit' // 卷帘工具
      | 'layerVideo' // 图集播放工具
      | 'customLayer' // 自定义添加图层
      | 'customGeoJson' // 自定义创建geojson
      | 'geocoder' // 地理位置查询
      | 'depthDataClip' // 深部数据裁剪
      | 'contourLine' // 等高线地形分析
      | 'COG2Terrain' // 栅格cog转地形
      | 'ImgToAudio' // 图像转声音
      /** 默认为true,打开工具 */
      show?: boolean;

      /** 工具面板的定位, 默认定位到左上角 */
      style?: {
        right?: number;
        left?: number;
        top?: number;
        bottom?: number;
      };
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
      /**
       * 是否只勾画一次，如果设为true，则在第一勾画结束时停止
       * @default undefined
       */
      once?: boolean;
      /**
       * 是否使用单例模式，如果开启，当勾画第二个图形时会销毁第一个图形
       */
      oneInstance?: boolean;
      /** 画图工具方法 */
      operate: 'start' | 'destroy';
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
```

### 可监听的Iframe事件

```ts
namespace IframeListener {
  type Event = {
    'initial': boolean;
    'layer:add': Layer.layerManageItem;
    'layer:render': Layer.layerManageItem;
    'layer:update': Layer.layerManageItem;
    'layer:remove': Layer.layerManageItem;
    'layer:move': Layer.layerManageItem[];
    'dataSet:add': Layer.DataSet;
    'dataSet:update': Layer.DataSet;
    'dataSet:remove': Layer.DataSet;
    'mapConfig:update': Iframe.Event['mapConfig'];

    'addAtom': Layer.layerManageItem;
    'addLayer': Layer.layerManageItem;
    'removeLayer': boolean;
    'moveLayerById': boolean;
    'addDataSet': boolean;
    'removeDataSet': boolean;
    'addPoints': boolean;
    'removePoints': boolean;
    'componentConfig': boolean;
    'mapConfig': boolean;
    'cartography': boolean;
    'openTool': boolean;
    'renderLayer': boolean;
    'spatialQuery': boolean;
    'cogQuery': boolean;
    'drawer': {
      /** 绘制的图形类型 */
      type: 'POLYGON' | 'POLYLINE' | 'POINT' | 'CIRCLE' | 'RECTANGLE';
      /** 经纬度坐标串 */
      positions: number[][];
    };
    'zoomTo': boolean;
    'get:mapConfig': Iframe.Event['mapConfig']
    'get:layers': Layer.layerManageItem[];
    'get:dataset': Layer.DataSet[];
  }
}
```

### Layer类型声明

请查看 [ts声明]('./src/typings/layer.ts')