 
# dde-earth-iframe

[![npm version](https://badge.fury.io/js/dde-earth-iframe.svg)](https://badge.fury.io/js/dde-earth-iframe)

这是一个用于在网页中嵌入地球仪的npm包。

## 安装

使用 npm 安装：

```bash
npm install dde-earth-iframe --save
```

## 使用

```ts
import EarthIframe from 'dde-earth-iframe';

const container = document.getElementById('container');
const options = {
  baseUrl: 'https://deep-time.org/map/#/showcase', // 默认值为 "https://deep-time.org/map/#/showcase"
  // 其他选项...
};

const earthIframe = new EarthIframe(container, options);

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
