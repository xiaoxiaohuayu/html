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

