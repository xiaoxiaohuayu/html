## 思路
  首先vite的插件是一个可以通过npm安装的包，先建一个项目init
  然后在package.json中的name是插件的名字
  main是文件入口
  这里的用的是pnpm包管理工具
  把总体的文件夹的结构差不多是这样的
  ![avatar](/packages/vite-plugin-template/1654679669146.jpg)
  我的根目录是 vite-plugin-template
  dist是插件打包之后的文件
  node_module是要写vite插件需要使用的包
  src 源码文件夹
  pluginsTest 这个是我要使用插件的例子项目
  package.json  这个就是插件package说明
这里其实都还好，但是当我去引用的时候老是找不到这个包，就下面是红线，这个问题后面会说，很简单还是不懂的package的一些东西。
这里其实最大的作用就是吧src的文件打包，然后在pluginsTest使用
下面介绍pluginsTest文件夹
  ![avatar](/packages/vite-plugin-template/1654680365587.jpg)
很简洁
  node_module 项目中要用的插件
  package.json 这要注意的是怎么去引用插件
  在devDependencies中要写你插件的名字，注意这里要说下“找不到包的问题”，原因是对'link:'这个不熟悉。link的是包的名称而非文件夹名称 
  反正就是要保证你的文件夹和你包的名字是保持一致的就行
  因为我包的名字是vite-plugin-template 而文件夹是vitePlugin 所以一直报错

```
{
  "name": "vite-vue3-ts-pinia",
  "private": true,
  "version": "0.0.1",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@vueuse/core": "^8.2.0",
    "axios": "^0.26.1",
    "pinia": "^2.0.12",
    "vue": "^3.2.25",
    "vue-router": "^4.0.14"
  },
  "devDependencies": {
    "@types/node": "^17.0.23",
    "@vitejs/plugin-vue": "^2.2.0",
    "typescript": "^4.5.4",
    "vite": "link:../node_modules/vite",
    "vite-plugin-template": "link:../../",
    "vue-tsc": "^0.29.8"
  }
}

```
  然后在vite.config.ts 中就可以这样引入插件
  ```import template from 'vite-plugin-template';```
  然后在plugins正常使用，
  ```
    plugins: [template()],
  ```
  怎么看这个插件又没有使用呢。在插件的钩子函数中去打印log
  在原博客中说执行npm run dev 也会走钩子，但是我这个不走 执行npm run build才打印
  ![avatar](/packages/vite-plugin-template/1654681944248.jpg)
  在插件中有好多的钩子函数 有些是vite的有些是rollup的

## 问题：
我在看vite 官网的插件部分的时候认为这里的插件就是一个函数 return出你的配置项。其实我感觉我的这个想法是没错的。
但是当我去那样写的时候发现不是这样的，也没有仔细去研究，还是去专心造轮子吧。

## 原博客地址
https://juejin.cn/post/7103165205483356168
