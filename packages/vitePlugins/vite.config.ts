// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import viteMockPlugin from 'my-vite-plugin-mock'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

export default defineConfig({
  plugins: [
    reactRefresh(),
    viteMockPlugin({
      dir: [resolve('./mock')] // 自动解析 mock 文件夹下的文件
    })
  ],
})
