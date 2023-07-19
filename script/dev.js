const args = require("minimist")(process.argv.slice(2));
const { resolve } = require("path");
const fs = require("fs");
const { build } = require("esbuild");
// console.log(process.argv.slice(2)); // [ 'reactivity', '-f', 'global' ]
// minimist is a node module that parses command line arguments.
// minimist是一个解析命令行参数的节点模块
console.log(args);
const target = args._[0] || "reactivity";
const format = args.f || "global";
console.log(target, format);
const pkg = require(resolve(__dirname, `../packages/${target}/package.json`));
/**
 * iife 立即执行 ()()
 * cjs node中 modele.exports
 * esm 浏览器中 import
 */
// 文件格式
const outputFormat = format.startsWith("global")
  ? "iife"
  : format === "cjs"
  ? "cjs"
  : "esm";
// 打包之后的文件地址
const outFile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
);
build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.js`)], //打包入口
  outfile: outFile, //打包之后的文件地址
  bundle: true, //是否打包
  sourcemap: true, //是否生成sourcemap
  format: outputFormat, //打包文件格式
  // minify: true, //是否压缩
  globalName: pkg.buildOptions?.name, //打包的全局名字
  platform: format == "cjs" ? "node" : "browser", //打包平台
  watch: {
    onRebuild(module) {
      if (!module) {
        console.log("rebuilt-------------");
      }
    },
  },
}).then(() => {
  console.log("build success");
});
