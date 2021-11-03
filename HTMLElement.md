# 关于HTML的自定义元素的尝试
------

之前在某篇的微信公众号上看到过HTML可以自定义元素的，在我看来这基本上就等于：**HTML的自定义元素==vue的组件化** 后台才知道区别还是蛮大的。

![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)

首先官方的文档来一手：

### [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)

> 我是推荐还是先看下 <i class="icon-file"></i> **文档** 。
### [googleDEV](https://developers.google.com/web/fundamentals/web-components/customelements#extendcustomeel)

> 这里是谷歌关于自定义Web组件的说明。

### [whatwg社区](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements)

> 这个不知道啥网站感觉挺全的。·WHATWG 致力于开发网络平台的基本部分的多项技术。它们的组织有点武断，基于那些编辑这些技术的标准的偏好·

------

## 什么是自定义标签

除了HTML已经存在的标签之外用户自定义的标签

### 1. 定义
有2种的标签一个是彻底是用户自定义的标签，声明方式：
```
document.createElement("custom-ele")
```
还有一种是基于现有的元素继承而来，声明方式：
```
document.createElement("p", { is: "custom-ele" })
//这里着重说明下 当你去使用继承现有的元素去创建自定义元素时 标签必须为你继承的标签 否则会报错：
//Illegal constructor: localName does not match the HTML element interface,
//这里的is是需要你在继承标签上写的  eg：<p is="custom-ele"></p>  
```

**创建自定义元素的规则**：自定义标签是必须要有闭合标签的，且名字必须有破折号-符号，不能重复。别问为啥。规定
> 自定义元素的功能使用扩展的 ES2015类`class`进行定义。扩展可确保自定义元素继承整个 DOM API，并且意味着您添加到类中的任何属性/方法都将成为元素 DOM 界面的一部分.
下面例子来自(https://developers.google.com/web/fundamentals/web-components/customelements#extendcustomeel)

```
class AppDrawer extends HTMLElement {
  // A getter/setter for an open property.
  get open() {
    return this.hasAttribute('open');
  }
  set open(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
    this.toggleDrawer();
  }
  // A getter/setter for a disabled property.
  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(val) {
    // Reflect the value of the disabled property as an HTML attribute.
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
  // Can define constructor arguments if you wish.
  constructor() {
    // If you define a constructor, always call super() first!
    // This is specific to CE and required by the spec.
    super();
    // Setup a click listener on <app-drawer> itself.
    this.addEventListener('click', e => {
      // Don't toggle the drawer if it's disabled.
      if (this.disabled) {
        return;
      }
      this.toggleDrawer();
    });
  }
  toggleDrawer() {
  }
}

customElements.define('app-drawer', AppDrawer);
```
自定义元素也有类似声明周期的挂钩
| 名字        | 执行顺序   |
| --------   | -----  | 
| constructor |创建或升级元素实例。可用于初始状态、设置活动听众或创建阴影 dom。说白了就是初始化 | 
| connectedCallback|每次将元素插入Dom时调用。场景：如获取资源或渲染。一般来说，你应该尽量把工作代码到这个时候去执行
| disconnectedCallback        |每次从 Dom 中删除元素时都会调用。
|attributeChangedCallback(attrName, oldVal, newVal)|当已添加、删除、更新或替换‎‎所观察到的属性‎‎时调用。当解析器创建或‎‎升级‎‎元素时，也需要初始值。‎‎注意：‎‎只有属性中列出的属性才会收到此回调`observedAttributes`方法
|adoptedCallback|自定义元素已移入一个新的（例如有人调用），documentdocument.adoptNode(el)。说实话我不太清楚这个是干啥的


connectedCallback：当 custom element首次被插入文档DOM时，被调用。
disconnectedCallback：当 custom element从文档DOM中删除时，被调用。
adoptedCallback：当 custom element被移动到新的文档时，被调用。
attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。


自定义元素可以在注册其定义之前使用哦。如果想知道标签有没有定义可是调用
```
customElements.whenDefined('app-drawer').then(() => {
  console.log('app-drawer defined');
});
```
在看别人使用这个自定义的标签时候 发现会有shadow root这个标签，提前注意一下并不是所有的标签都可以加载上shadow-root。这里我不太明白为啥声明自定标签的时候要设置这个属性，唯一比较中听的是 `shadow-root`为元素提供了与页面渲染、风格分开的dom样式。大白话感觉就是再说 这里的解析渲染跟整体页面不是一起的。对性能有一定提升。
在上面`class AppDrawer extends HTMLElement`这里其实可以扩展（继承元素的写法）为`HTMLButtonElement` `HTMLImageElement` `HTMLParagraphElement` 依次是button、img、p标签 这里有个列表（https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLParagraphElement）
# 注意：当使用`class AppDrawer extends 这里的如果写特定标签` 需要在声明的时候写 is 比如`<img is="bigger-img" width="15" height="20">`
最后说下兼容性 处理IE的不支持，其他的都以支持。
如果不支持 可下载`https://github.com/webcomponents/webcomponentsjs#using-webcomponents-loaderjs`
`npm install --save @webcomponents/webcomponentsjs`
来自谷歌（https://developers.google.com/web/fundamentals/web-components/customelements#upgrades）
```
<!-- Use the custom element on the page. -->
<my-element></my-element>

<!-- Load polyfills; note that "loader" will load these async -->
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js" defer></script>

<!-- Load a custom element definitions in `waitFor` and return a promise -->
<script type="module">
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  WebComponents.waitFor(() => {
    // At this point we are guaranteed that all required polyfills have
    // loaded, and can use web components APIs.
    // Next, load element definitions that call `customElements.define`.
    // Note: returning a promise causes the custom elements
    // polyfill to wait until all definitions are loaded and then upgrade
    // the document in one batch, for better performance.
    return loadScript('my-element.js');
  });
</script>
```