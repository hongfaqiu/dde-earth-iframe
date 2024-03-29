import { Iframe } from "./iframe";
import { Layer } from "./layer";

export declare namespace IframeListener {
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
    /** 工具开关回调 */
    'toolVisible': {
      key: Iframe.Event['openTool']['tool'];
      show: boolean;
    }
  }

}