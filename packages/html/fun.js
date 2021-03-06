/*
    临时备用
*/ import lodash from '@/libs/lodash' // lodash工具
var _ = lodash

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
_.debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function() {
    // 据上一次触发时间间隔
    var last = _.now() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function() {
    context = this
    args = arguments
    timestamp = _.now()
    var callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
_.throttle = function(func, wait, options) {
  var context, args, result
  var timeout = null
  // 上次执行时间点
  var previous = 0
  if (!options) options = {}
  // 延迟执行函数
  var later = function() {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : _.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    var now = _.now()
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) previous = now
    // 延迟执行时间间隔
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
      // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
/**
 * 深拷贝
 */
/* eslint-disable */
const _deepCopy = (item) => {
  const o = item instanceof Array ? [] : {}
  for (const k in item) {
    if (typeof item[k] != 'object') o[k] = item[k]
    else o[k] = _deepCopy(item[k])
  }
  return o
}
// _deepCopy({})/
// 1、对象中有字段值为undefined，转换后则会直接字段消失
// 2、对象如果有字段值为RegExp对象，转换后则字段值会变成{}
// 3、对象如果有字段值为NaN、+-Infinity，转换后则字段值变成null
// 4、对象如果有环引用，转换直接报错
function deepClone(target, map = new Map()) {
  // 获取类型
  const type = checkType(target)
  // 基本数据类型直接返回
  if (!canForArr.concat(noForArr).includes(type)) return target
  // 判断Function，RegExp，Symbol
  if (type === funcTag) return cloneFunction(target)
  if (type === regexpTag) return cloneReg(target)
  if (type === symbolTag) return cloneSymbol(target)
  // 引用数据类型特殊处理
  const temp = checkTemp(target)
  if (map.get(target)) {
      // 已存在则直接返回
      return map.get(target)
  }
  // 不存在则第一次设置
  map.set(target, temp)
  // 处理Map类型
  if (type === mapTag) {
      target.forEach((value, key) => {
          temp.set(key, deepClone(value, map))
      })
      return temp
  }
  // 处理Set类型
  if (type === setTag) {
      target.forEach(value => {
          temp.add(deepClone(value, map))
      })
      return temp
  }
  // 处理数据和对象
  for (const key in target) {
      // 递归
      temp[key] = deepClone(target[key], map)
  }
  return temp
}

const a = {
  name: 'sunshine_lin',
  age: 23,
  hobbies: { sports: '篮球', tv: '雍正王朝' },
  works: ['2020', '2021'],
  map: new Map([['haha', 111], ['xixi', 222]]),
  set: new Set([1, 2, 3]),
  func: (name, age) => `${name}今年${age}岁啦！！！`,
  sym: Symbol(123),
  reg: new RegExp(/haha/g),
}
a.key = a // 环引用

const b = deepClone(a)
console.log(b)
// {
//     name: 'sunshine_lin',
//     age: 23,
//     hobbies: { sports: '篮球', tv: '雍正王朝' },
//     works: [ '2020', '2021' ],
//     map: Map { 'haha' => 111, 'xixi' => 222 },
//     set: Set { 1, 2, 3 },
//     func: [Function],
//     sym: [Symbol: Symbol(123)],
//     reg: /haha/g,
//     key: [Circular]
// }
// console.log(b === a) // false
