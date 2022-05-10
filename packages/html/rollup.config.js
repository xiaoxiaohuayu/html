import { nodeResolve } from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue'
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
/*
将vue文件打包成js对象。注意其中的依赖 优先安装@rollup的插件，plugins的插件顺序也要注意负责会出现语法错误。
场景 在远端动态的获取vue文件，使用方式：创建动态的Script插入，将组件挂载到 this.mode = window.MyComponent
*/
export default {
  input:  './index.vue' ,
  output: {
    format: 'iife',
    file:  './rollup.js' ,
    name:  'MyComponent'
  },
  // external: [ 'fs' ],
  plugins: [
    vue(),
    babel({ babelHelpers: 'bundled' }),
    nodeResolve(),
    commonjs(),
  ]
}