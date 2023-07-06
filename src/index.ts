import { IframeListener } from "./typings/IframeListener";
import { Iframe } from "./typings/iframe";

export { API } from './typings/api';
export { GeojsonStyle } from './typings/geojsonStyle';
export { Iframe } from './typings/iframe';
export { Layer } from './typings/layer';

type EarthIframeOptions = {
  /** iframe url, defaults to "https://deep-time.org/map/#/showcase" */
  baseUrl?: string;
} & Iframe.Event['mapConfig'];

const DefaultEarthIframeOptions: EarthIframeOptions = {
  baseUrl: "https://deep-time.org/map/#/showcase"
};

function uniqueId(): string {
  let _val = '';

  do {
    _val = Math.random().toString(36).slice(-8);
  } while (_val.length < 8);

  return _val;
}

export default class EarthIframe {
  iframe: HTMLIFrameElement;
  container: HTMLElement | null;
  private _loaded: boolean;
  private _baseUrl: string;
  loadPromise: Promise<this>;
  private _listeners: {
    [K in keyof IframeListener.Event]?: Map<string, {
      func: (res: IframeListener.Event[K]) => any;
      match?: boolean;
    }>
  } = {}
  private _destroyed: boolean = false;

  
  /**
   * 加载地球iframe
   * @param container 容器元素或容器元素id
   * @param opts 配置项
   */
  constructor(
    container: HTMLElement | string,
    opts?: Partial<EarthIframeOptions>
  ) {
    const options: EarthIframeOptions = {
      ...DefaultEarthIframeOptions,
      ...opts
    };
    this.container =
      typeof container === "string"
        ? document.getElementById(container)
        : container;
    if (!this.container) throw Error("container is undefined!");

    this._baseUrl = options.baseUrl;

    this.iframe = document.createElement("iframe");
    this.container?.append(this.iframe);
    this.iframe.style.width = "100%";
    this.iframe.style.height = "100%";
    
    this.iframe.src = this._baseUrl;
    this._loaded = false;
    
    window.addEventListener('message', this._eventListener.bind(this));
    this.loadPromise = new Promise<typeof this>((resolve) => {
      this.addEventListener('initial', (res) => {
        this._loaded = true;
        this.dispatch('mapConfig', options).then((res) => {
          resolve(this)
        })
      }, {
        once: true,
      })
    });
  }

  get loaded() {
    return this._loaded;
  }

  get isDestroy() {
    return this._destroyed;
  }

  private _eventListener(e: MessageEvent) {
    if (typeof e.data === 'object') {
      const { type, body, extra } = e.data;
      if (this._listeners[type]) {
        for (let [key, val] of this._listeners[type]) {
          const { match, func } = val;
          if (match && key === extra) {
            func(body)
          } else {
            func(body);
          }
        }
      }
    }
  }
  
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
  addEventListener<T extends keyof IframeListener.Event>(
    type: T, 
    callback: (res: IframeListener.Event[T], type?: T) => any, 
    opts?: {
      once?: boolean;
      match?: boolean;
      id?: string;
    }
  ) {
    const { once, match, id: inputId } = opts ?? {};
    const id = inputId ?? uniqueId();
    if (!this._listeners[type]) {
      this._listeners[type] = new Map();
    }
    this._listeners[type].set(id, {
      func: (res) => {
        callback(res, type)
        if (once) {
          this.removeEventListener(id)
        }
      },
      match
    });
    return id;
  }

  /**
   * 移除事件监听
   * @param id 监听事件的唯一id
   */
  removeEventListener(id: string) {
    if (this._destroyed) return;

    for (let type in this._listeners) {
      const map = this._listeners[type] as Map<string, any>;
      if (map.has(id)) {
        map.delete(id);
      }
    }
  }

  /**
   * 发送事件
   * @param type 事件类型
   * @param body 事件参数
   * @returns Promise
   */
  async dispatch<T extends keyof Iframe.Event>(type: T, body: Iframe.Event[T]): Promise<IframeListener.Event[T]> {
    if (this._loaded !== true || !this.iframe.contentWindow) {
      return;
    }

    const extra = uniqueId();
    return new Promise((resolve, reject) => {
      this.iframe.contentWindow?.postMessage({
        type, body, extra
      }, "*");
      try {
        this.addEventListener(type as any, (res => {
          resolve(res);
        }), {
          id: extra,
          match: true,
          once: true
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 销毁实例
   */
  destroy() {
    this.iframe.remove();
    window.removeEventListener('message', this._eventListener);
    this._listeners = {};
    this._destroyed = true;
    this._loaded = false;
  }
}
