# 临时记录有趣的小东西
原作者：https://segmentfault.com/a/1190000040635362
```
setTimeout(() => {
console.log(1);
},0);
new Promise((resolve, _) => {
console.log(2);
resolve();
}).then(res => {
console.log(3);
}).then(res => {
console.log(4);
});
console.log(5);var foo = 0;(function foo() { foo = 10; console.log(foo); }());console.log(foo)
```
```
// setTimeout(function () {
//   console.log("set1");
//   new Promise(function (resolve) {
//     resolve();
//   }).then(function () {
//     new Promise(function (resolve) {
//       resolve();
//     }).then(function () {
//       console.log("then4");
//     });
//     console.log("then2");
//   });
// });

// new Promise(function (resolve) {
//   console.log("pr1");
//   resolve();
// }).then(function () {
//   console.log("then1");
// });

// setTimeout(function () {
//   console.log("set2");
// });

// console.log(2);

// queueMicrotask(() => {
//   console.log("queueMicrotask1");
// });

// new Promise(function (resolve) {
//   resolve();
// }).then(function () {
//   console.log("then3");
// });



// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }

// async function async2() {
//   console.log("async2");
// }

// console.log("script start");

// setTimeout(function () {
//   console.log("setTimeout");
// }, 0);

// async1();

// new Promise(function (resolve) {
//   console.log("promise1");
//   resolve();
// }).then(function () {
//   console.log("promise2");
// });

// console.log("script end");



// async function async1() {
//   console.log('async1 start')
//   await async2()
//   console.log('async1 end')
// }

// async function async2() {
//   console.log('async2')
// }

// console.log('script start')

// setTimeout(function () {
//   console.log('setTimeout0')
// }, 0)

// setTimeout(function () {
//   console.log('setTimeout2')
// }, 300)

// setImmediate(() => console.log('setImmediate'));

// process.nextTick(() => console.log('nextTick1'));

// async1();

// process.nextTick(() => console.log('nextTick2'));

// new Promise(function (resolve) {
//   console.log('promise1')
//   resolve();
//   console.log('promise2')
// }).then(function () {
//   console.log('promise3')
// })

// console.log('script end')

<!-- dome  -->
function* chars() {
  for (let i of [1,2,3,4,5]) {
      yield new Promise((resolve)=> setTimeout(()=>{ 
        resolve(i)
       },1000))
  }
}
async function dome() {
  for (let chunk of chars()) {
      console.log(await chunk)
  }
}
dome()


```
