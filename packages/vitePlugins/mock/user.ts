// ./mock/user.ts
// 同时支持 ts 文件，可以使用 ts 定义给与提示
import { Routes } from 'my-vite-plugin-mock'
function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

// 路由前缀，该文件中所有的路由都会加上这个前缀
export const prefix = '/user'

const userModule: Routes = {
  'get /getUserInfo': async ({ query }, req, res) => {
    // 第一个参数是已经被解析的上下文参数，有 query,params,body 等解析项，当然，为了灵活性，也提供给用户原生的 req 与 res
    await wait(2000)
    if (query.username) {
      return {
        data: {
          username: query.username
        }
      }
    }
    return {
      data: {
        username: 'xxx',
        email: 'xxx@xxx.com'
      }
    }
  }
}

export default userModule
