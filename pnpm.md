## pnpm-workspace.yaml
定义工作区域的包
```packages:
  # packages和components下面的所有文件
  - 'packages/**'
  - 'components/**'
  # 排除的文件夹
  - '!**/test/**'
```
## 命令部分
如果是一些公共的包
```pnpm install vue axios -w //加-w的参数会自动安装到根目录的node_modules```
如果这个包公共不需要，但是我内部的包要使用的话 可以走下面的这个
``` pnpm i react-scripts -r --filter @test/web // ```
```-r```将从每个工作区的包中相关依赖 有点模糊 直白的意思是递归所有的包
```--filter @test/web``` 过滤，只在@test/web里去安装，@test/web 是package.json 中的name 使用 --filter 后面接子 package 的 name 表示只把安装的新包装入这个 package 中。
## 启动方式
子项目启动的话在根级的packages.json中的scripts配置命令
```cd packages/air-conditioning && react-scripts start```进入packages下的某个项目 并切运行启动
还有一种就是使用 --filter 

`--filter`（`-F`）指令，你可以**设定选择器，让pnpm在特定包下执行指令**。

```
// ./package.json
{
    // ...
    "scripts": {
        "app:dev": "pnpm run --filter @laffery/app dev",
        "app:build": "pnpm run --filter @laffery/app build",
        "app:deploy": "pnpm run --filter @laffery/app deploy"
    }
    // ...
}
```

## 问题

如果存在对package里的包有引用这种问题怎么解决

1. 源码引用,import { isObject } from "@hao/shared";和import input from './ant-design-vue/es/input/index'
2. 打包之后的引用 打包完成，直接通过包名引用产物
3. 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
4. https://github.com/xiaoxiaohuayu/html.git