

/**
 * timeInSecond  貌似是用户 id 
 */
const jsname = '微博删除'
const axios = require('axios').default;
const $ = Env(jsname)
var node_uid = require('node-uid')
const logDebug = 0
let httpResult //global buffer

let host = 'weibo.com'
let hostname = 'https://' + host

let userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55'
let userHeaderArr = '_s_tentry=www.baidu.com; UOR=www.baidu.com,app.weibo.com,www.baidu.com; Apache=1173757649906.8857.1641810013150; SINAGLOBAL=1173757649906.8857.1641810013150; ULV=1641810013171:1:1:1:1173757649906.8857.1641810013150:; login_sid_t=0a62ccc0cc5a4416fb67c76efd508e2a; cross_origin_proto=SSL; WBStorage=5fd44921|undefined; SUB=_2A25M2HhZDeRhGeNM71cT9y3Ewj6IHXVvrO6RrDV8PUNbmtB-LRLskW9NTg7WUpY6OGAdHxbuakdlwNexBiLzooSV; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhG4oPoL.I53m6_qbANHUQb5JpX5KzhUgL.Fo-ESh-ES0eR1Kz2dJLoIEBLxK-LBo5L12qLxK-LBo5L12qLxKqLBK2LBKqLxK.LBo2LB.et; ALF=1673345933; SSOLoginState=1641809934; wvr=6; wb_view_log_5245273892=2560*14401; webim_unReadCount=%7B%22time%22%3A1641810452270%2C%22dm_pub_total%22%3A0%2C%22chat_group_client%22%3A0%2C%22chat_group_notice%22%3A0%2C%22allcountNum%22%3A0%2C%22msgbox%22%3A0%7D; XSRF-TOKEN=sXcPgishe1yRWQ9GFFvBkfIX; WBPSESS=SR0wHpLZBYQgPjitOiuibAQWYYFWT03Ix5JGFXOyQ_wkSqINT948NTg5G8uqq-3i69GWkylfr95plYoOvhmPCDSKXdzRS1cVEYhlaOX7aue_jZXfjDWiwkbMDVEE4PhgP-HSgcxypCOL9is-j9WdUA=='

let userIdx = 0
let UAcount = 0
let adIdList = []

function printCaller(){
  return (new Error()).stack.split("\n")[2].trim().split(" ")[1]
}

///////////////////////////////////////////////////////////////////
!(async () => {
  await TreeOpenBox()
})()
  .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
      $.done();
  })

//
/**
 * 传入id 删除微博
 */
async function SleepStart(id) {
  let caller = printCaller()
  let timeInSecond = 5245273892
  let url = `${hostname}/ajax/statuses/destroy`
  let body = `{"id":"${id}"}`
  // let urlObject = populatePostUrl(url,body,timeInSecond)
  // console.log(urlObject)
  await $.wait(1000)
  await axios({
    method: "POST",
    headers: {
      'pragma': 'no-cache',
      'referer': `https://weibo.com/u/${timeInSecond}`,
      'sec-ch-ua': `"Not;A Brand";v="99", "Microsoft Edge";v="97", "Chromium";v="97"`,
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': "Windows",
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'traceparent': '00-fe4acd4032b7a66e83a271e03ba4a9b4-a17bc00483aa27ac-00',
      'user-agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55`,
      'x-requested-with': 'XMLHttpRequest',
      'x-xsrf-token': 'sXcPgishe1yRWQ9GFFvBkfIX',
      Cookie: userHeaderArr,
    },
    url: url,
    data:{id}
  }).then(res=>{
  console.log(res.data.ok,'999')
  })
}

// 获取前二十条的微博  默认会返回20条 如果删除 
async function TreeOpenBox() {
  // let timeInMS = Math.round(new Date().getTime())
  // let timeInSecond = Math.floor(timeInMS / 1000)
  let timeInSecond = 5245273892
  let caller = printCaller()
  let url = `${hostname}/ajax/statuses/mymblog?uid=${timeInSecond}&page=1&feature=0`
  let urlObject = populateGetUrl(url,timeInSecond)
  await httpGet(urlObject, caller)
  let result = httpResult
  // let result = JSON.parse(res)
  // console.log(result,'*****')
  if(result && result.ok ==1){
    if(Array.isArray(result['data']['list'])){
    for (let i = 0; i < result['data']['list'].length; i++) {
      adIdList.push(result['data']['list'][i].id)
      await SleepStart(result['data']['list'][i].id)
    }
    console.log(adIdList)
    }
  }
}
////////////////////////////////////////////////////////////////////
function populatePostUrl(url, reqBody = '',timeInSecond) {
  let urlObject = {
    url: url,
    headers: {
      'pragma': 'no-cache',
      'referer': `https://weibo.com/u/${timeInSecond}`,
      'sec-ch-ua': `"Not;A Brand";v="99", "Microsoft Edge";v="97", "Chromium";v="97"`,
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': "Windows",
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'traceparent': '00-fe4acd4032b7a66e83a271e03ba4a9b4-a17bc00483aa27ac-00',
      'user-agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55`,
      'x-requested-with': 'XMLHttpRequest',
      'x-xsrf-token': 'sXcPgishe1yRWQ9GFFvBkfIX',
      Cookie: userHeaderArr,
    },
    body: reqBody
  }
  return urlObject
}

function populateGetUrl(url,timeInSecond) {
  let urlObject = {
    url: url,
    headers: {
      'pragma': 'no-cache',
      'referer': `https://weibo.com/u/${timeInSecond}`,
      'sec-ch-ua': `"Not;A Brand";v="99", "Microsoft Edge";v="97", "Chromium";v="97"`,
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': "Windows",
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'traceparent': '00-fe4acd4032b7a66e83a271e03ba4a9b4-a17bc00483aa27ac-00',
      'user-agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55`,
      'x-requested-with': 'XMLHttpRequest',
      'x-xsrf-token': 'sXcPgishe1yRWQ9GFFvBkfIX',
      Cookie: userHeaderArr,
    }
  }
  return urlObject
}

async function httpPost(url, caller) {
  httpResult = null
  return new Promise(resolve => {
    $.post(url, async (err, resp, data) => {
      console.log(data)
      try {
        if (err) {
          console.log(caller + ': post请求失败')
          console.log(JSON.stringify(err))
          $.logErr(err)
        } else {
          if (safeGet(data)) {
            httpResult = JSON.parse(data)
            if (logDebug) console.log(httpResult)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

async function httpGet(url, caller) {
  httpResult = null
  return new Promise(resolve => {
    $.get(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log(caller + ': get请求失败')
          console.log(JSON.stringify(err))
          $.logErr(err)
        } else {
          if (safeGet(data, caller)) {
            httpResult = JSON.parse(data)
            if (logDebug) console.log(httpResult)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}

function safeGet(data, caller) {
  try {
    if (typeof JSON.parse(data) == 'object') {
      return true
    } else {
      console.log(`Function ${caller}: 未知错误`)
      console.log(data)
    }
  } catch (e) {
    console.log(e)
    console.log(`Function ${caller}: 服务器访问数据为空，请检查自身设备网络情况`)
    return false
  }
}

function printCaller() {
  return new Error().stack
    .split('\n')[2]
    .trim()
    .split(' ')[1]
}

function getMin(a, b) {
  return a < b ? a : b
}

function getMax(a, b) {
  return a < b ? b : a
}

function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t
    }
    send(t, e = 'GET') {
      t = 'string' == typeof t ? { url: t } : t
      let s = this.get
      return (
        'POST' === e && (s = this.post),
        new Promise((e, i) => {
          s.call(this, t, (t, s, r) => {
            t ? i(t) : e(s)
          })
        })
      )
    }
    get(t) {
      return this.send.call(this.env, t)
    }
    post(t) {
      return this.send.call(this.env, t, 'POST')
    }
  }
  return new (class {
    constructor(t, e) {
      ;(this.name = t),
        (this.http = new s(this)),
        (this.data = null),
        (this.dataFile = 'box.dat'),
        (this.logs = []),
        (this.isMute = !1),
        (this.isNeedRewrite = !1),
        (this.logSeparator = '\n'),
        (this.startTime = new Date().getTime()),
        Object.assign(this, e),
        this.log('', `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
    }
    isNode() {
      return 'undefined' != typeof module && !!module.exports
    }
    isQuanX() {
      return 'undefined' != typeof $task
    }
    isSurge() {
      return 'undefined' != typeof $httpClient && 'undefined' == typeof $loon
    }
    isLoon() {
      return 'undefined' != typeof $loon
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t)
      } catch {
        return e
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t)
      } catch {
        return e
      }
    }
    getjson(t, e) {
      let s = e
      const i = this.getdata(t)
      if (i)
        try {
          s = JSON.parse(this.getdata(t))
        } catch {}
      return s
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e)
      } catch {
        return !1
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({ url: t }, (t, s, i) => e(i))
      })
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata('@chavy_boxjs_userCfgs.httpapi')
        i = i ? i.replace(/\n/g, '').trim() : i
        let r = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
        ;(r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r)
        const [o, h] = i.split('@'),
          a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: 'cron', timeout: r }, headers: { 'X-Key': o, Accept: '*/*' } }
        this.post(a, (t, e, i) => s(i))
      }).catch(t => this.logErr(t))
    }
    loaddata() {
      if (!this.isNode()) return {}
      {
        ;(this.fs = this.fs ? this.fs : require('fs')), (this.path = this.path ? this.path : require('path'))
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e)
        if (!s && !i) return {}
        {
          const i = s ? t : e
          try {
            return JSON.parse(this.fs.readFileSync(i))
          } catch (t) {
            return {}
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        ;(this.fs = this.fs ? this.fs : require('fs')), (this.path = this.path ? this.path : require('path'))
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data)
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, '.$1').split('.')
      let r = t
      for (const t of i) if (((r = Object(r)[t]), void 0 === r)) return s
      return r
    }
    lodash_set(t, e, s) {
      return Object(t) !== t
        ? t
        : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
          (e.slice(0, -1).reduce((t, s, i) => (Object(t[s]) === t[s] ? t[s] : (t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {})), t)[e[e.length - 1]] = s),
          t)
    }
    getdata(t) {
      let e = this.getval(t)
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : ''
        if (r)
          try {
            const t = JSON.parse(r)
            e = t ? this.lodash_get(t, i, '') : e
          } catch (t) {
            e = ''
          }
      }
      return e
    }
    setdata(t, e) {
      let s = !1
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? ('null' === o ? null : o || '{}') : '{}'
        try {
          const e = JSON.parse(h)
          this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), i))
        } catch (e) {
          const o = {}
          this.lodash_set(o, r, t), (s = this.setval(JSON.stringify(o), i))
        }
      } else s = this.setval(t, e)
      return s
    }
    getval(t) {
      return this.isSurge() || this.isLoon()
        ? $persistentStore.read(t)
        : this.isQuanX()
        ? $prefs.valueForKey(t)
        : this.isNode()
        ? ((this.data = this.loaddata()), this.data[t])
        : (this.data && this.data[t]) || null
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon()
        ? $persistentStore.write(t, e)
        : this.isQuanX()
        ? $prefs.setValueForKey(t, e)
        : this.isNode()
        ? ((this.data = this.loaddata()), (this.data[e] = t), this.writedata(), !0)
        : (this.data && this.data[e]) || null
    }
    initGotEnv(t) {
      ;(this.got = this.got ? this.got : require('got')),
        (this.cktough = this.cktough ? this.cktough : require('tough-cookie')),
        (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
        t && ((t.headers = t.headers ? t.headers : {}), void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers['Content-Type'], delete t.headers['Content-Length']),
        this.isSurge() || this.isLoon()
          ? (this.isSurge() && this.isNeedRewrite && ((t.headers = t.headers || {}), Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
            $httpClient.get(t, (t, s, i) => {
              !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i)
            }))
          : this.isQuanX()
          ? (this.isNeedRewrite && ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
            $task.fetch(t).then(
              t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
              },
              t => e(t)
            ))
          : this.isNode() &&
            (this.initGotEnv(t),
            this.got(t)
              .on('redirect', (t, e) => {
                try {
                  if (t.headers['set-cookie']) {
                    const s = t.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                    this.ckjar.setCookieSync(s, null), (e.cookieJar = this.ckjar)
                  }
                } catch (t) {
                  this.logErr(t)
                }
              })
              .then(
                t => {
                  const { statusCode: s, statusCode: i, headers: r, body: o } = t
                  e(null, { status: s, statusCode: i, headers: r, body: o }, o)
                },
                t => {
                  const { message: s, response: i } = t
                  e(s, i, i && i.body)
                }
              ))
    }
    post(t, e = () => {}) {
      if (
        (t.body && t.headers && !t.headers['Content-Type'] && (t.headers['Content-Type'] = 'application/x-www-form-urlencoded'),
        t.headers && delete t.headers['Content-Length'],
        this.isSurge() || this.isLoon())
      )
        this.isSurge() && this.isNeedRewrite && ((t.headers = t.headers || {}), Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })),
          $httpClient.post(t, (t, s, i) => {
            !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i)
          })
      else if (this.isQuanX())
        (t.method = 'POST'),
          this.isNeedRewrite && ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
          $task.fetch(t).then(
            t => {
              const { statusCode: s, statusCode: i, headers: r, body: o } = t
              e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            },
            t => e(t)
          )
      else if (this.isNode()) {
        this.initGotEnv(t)
        const { url: s, ...i } = t
        this.got.post(s, i).then(
          t => {
            const { statusCode: s, statusCode: i, headers: r, body: o } = t
            e(null, { status: s, statusCode: i, headers: r, body: o }, o)
          },
          t => {
            const { message: s, response: i } = t
            e(s, i, i && i.body)
          }
        )
      }
    }
    time(t) {
      let e = {
        'M+': new Date().getMonth() + 1,
        'd+': new Date().getDate(),
        'H+': new Date().getHours(),
        'm+': new Date().getMinutes(),
        's+': new Date().getSeconds(),
        'q+': Math.floor((new Date().getMonth() + 3) / 3),
        S: new Date().getMilliseconds()
      }
      ;/(y+)/.test(t) && (t = t.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length)))
      for (let s in e) new RegExp('(' + s + ')').test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ('00' + e[s]).substr(('' + e[s]).length)))
      return t
    }
    msg(e = t, s = '', i = '', r) {
      const o = t => {
        if (!t) return t
        if ('string' == typeof t) return this.isLoon() ? t : this.isQuanX() ? { 'open-url': t } : this.isSurge() ? { url: t } : void 0
        if ('object' == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t['open-url'],
              s = t.mediaUrl || t['media-url']
            return { openUrl: e, mediaUrl: s }
          }
          if (this.isQuanX()) {
            let e = t['open-url'] || t.url || t.openUrl,
              s = t['media-url'] || t.mediaUrl
            return { 'open-url': e, 'media-url': s }
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t['open-url']
            return { url: e }
          }
        }
      }
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)))
      let h = ['', '==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3==============']
      h.push(e), s && h.push(s), i && h.push(i), console.log(h.join('\n')), (this.logs = this.logs.concat(h))
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon()
      s ? this.log('', `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log('', `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1e3
      this.log('', `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  })(t, e)
}
