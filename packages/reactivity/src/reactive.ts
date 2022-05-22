import { isObject } from "@hao/shared";
// 转换响应式数据
export function reactive(target) {
  if (!isObject(target)) {
    return
  }
  // 并没有重新定义属性，只是代理，再取值的时候会调用get 赋值的时候set
  /**
   * 可以是任何类型的对象，包括原生数组，函数，甚至另一个代理
   */
  const proxy= new Proxy(target, {
    /**
     * 
     * @param target 目标对象
     * @param key 被获取的属性名
     * @param receiver Proxy或者继承Proxy的对象
     */
    get(target, key, receiver) {
      // 去代理对象上取值
      console.log('去代理对象上取值',target[key])
      // return Reflect.get(target,key,receiver)
      return target[key]
    },
        /**
     * 
     * @param target 目标对象
     * @param key 将被设置的属性名或 Symbol。
     * @param value 新属性值。
     * @param receiver 最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，
     * 或以其他方式被间接地调用（因此不一定是 proxy 本身）。
     * 返回值true 代表设置成功
     */
    set(target, key, value, receiver) {
      // 设置值
      console.log('去代理对象上设置值',target[key])
      // target[key] = value
      
      // return Reflect.set(target, key, value, receiver)
      return true
    }
  })
  return proxy
}
// function extend(sup, base) {
//   var descriptor = Object.getOwnPropertyDescriptor(
//     base.prototype, "constructor"
//   );
//   base.prototype = Object.create(sup.prototype);
//   var handler = {
//     construct: function(target, args) {
//       var obj = Object.create(base.prototype);
//       this.apply(target, obj, args);
//       return obj;
//     },
//     apply: function(target, that, args) {
//       sup.apply(that, args);
//       base.apply(that, args);
//     }
//   };
//   var proxy = new Proxy(base, handler);
//   descriptor.value = proxy;
//   Object.defineProperty(base.prototype, "constructor", descriptor);
//   return proxy;
// }

// var Person = function (name) {
//   this.name = name
// };

// var Boy = extend(Person, function (name, age) {
//   this.age = age;
// });

// Boy.prototype.sex = "M";

// var Peter = new Boy("Peter", 13);
// console.log(Peter.sex);  // "M"
// console.log(Peter.name); // "Peter"
// console.log(Peter.age);  // 13