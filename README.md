# 临时记录有趣的小东西
原作者：https://segmentfault.com/a/1190000040635362
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