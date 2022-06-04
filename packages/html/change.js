// ------------------------------------------
// var a = 1;
// var b = 2;
// 仅限数字
// b = (a + b) - b;
// a = (a + b) - a;
// console.log(a);
// 解构赋值
// [a, b] = [b, a];
// console.log(a, b);
// console.log((a = [b, (b = a)][0]));
// console.log((a = [a, (a = b)][0]));
// ------------------------------------------

// ------------------------------------------
// function fun() {
//   a++;
// }
// var a = 1;
// console.log(a);
// console.log(fun(a));
// console.log(fun(a));
// console.log(a);
// ------------------------------------------

// ------------------------------------------
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b.x);
/**
 * 优先级的问题
 * mdn 文档地址：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 * 最高19 最低1
 * 赋值操作 =  优先级为2
 * . 的操作为18
 * 这里当去访问a.x的时候a的对象不管是{ n: 1 }还是{ n: 2 } 此时a上是没有x的值为undefined
 * a.x = {n :2}
 * a = {n :2}
 * 因为 b=a 这里的引用地址是相同的 所以b.x的值是{ n: 2 }
 */
// ------------------------------------------
