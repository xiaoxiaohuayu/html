/**
 * 在朋友圈看到了比较有意思的东西
 * 
 */
// []+{}
// {}+[]
// {}*[]
// []*{}
// !![]&&+''
/**
 * 第一次看懵住了，然后执行了下，发现完全就是纸老虎。 
 */
// var i=1;
// function a(){
//   for (let i = 0; i < 10; i++) {};
//   function b(){
//     i++;
//     c();
//     console.log(i);
//   }
//   b();
// }
// function c(){
//   i++;
// }
// a()
// console.log(i)
/**
 * 讲真的 知道call 和 bind  知道语法 但是不知道怎么使用以及使用的场合
 */
// var i = 0;
// function a(){
//   d.call(this);
// }
// function b(){
//   var c = ()=>{
//     console.log(this.i)
//   };
//   c.call({i:10});
// }
// var d = b.bind(this);
// var obj = {
//   a:a
// };
// obj.a();
/**
 * 这个其实我还是比较疑惑的。为啥首先打印的是funtion C的函数呢？然后紧着这是B、B
 * 函数也是一等公民。这句话点醒了我。直接声明function的话就好比是在window上挂载的 （2021/10/16测试不正确）
 */
// function method(foo){
//   console.log(foo);
//   var foo = 'A';
//   var foo = function(){
//     console.log('B')
//   };
//   foo();
//   function foo(){
//     console.log('C');
//   }
//   foo();
// }
// var foo = 1
// method(foo)
/**
 * js中每一个对象或函数都有__proto__属性，但是只有函数对象才有prototype属性。
 * 结论1：Object.prototype只是一个普通对象，它是js原型链的最顶端。

(typeof Object.prototype) === object;//true
Object.prototype.__proto__=== null;//true
Object.prototype.prototype === undefied;//true
   
Object.prototype只是一个普通对象(普通对象没有prototype属性，所以值是undefined)，Object.prototype是js原型链的最顶端，它的__proto__是null(有__proto__属性，但值是null，因为这是原型链的最顶端)。


结论2：在js中如果A对象是由B函数构造的，那么A.proto === B.prototype。

function Person()
{
	
}
var obj = {};
alert(obj.__proto__ === Object.prototype);//true
alert(Person.__proto__ === Function.prototype);//true

javascript中对象是由Object创建的，函数是由Function创建的。


结论3：内置的Object是其实也是一个函数对象，它是由Function创建的。
Object.__proto__ === Function.prototype;
结论4：js中每一个对象或函数都有__proto__属性，但是只有函数对象才有prototype属性。

//函数对象
function Person()
{
	
}
 
// 普通对象
var obj = {};
 
obj.__proto__ === Object.prototype;//true
obj.prototype === undefined;//true
Person.__proto__ === Function.prototype;//true
Person.prototype !== undefined;//true

我们知道javascript正是通过prototype实现继承的。如果objA、objB都是由cFunction创建的，那么根据结论2，objA.proto === objB.proto === cFunction.prototype，也就是说objA和objB对象都继承了cFunction的prototype。原型链是基于__proto__形成的，继承是通过prototype实现的。


结论5：Function.prototype是个特例，它是函数对象，但是没有prototype属性。其他所有函数都有prototype属性。

(typeof Function.prototype) === function;//true
Function.prototype.prototype === undefined;//true


结论6：内置的Function也是一个函数对象，它是通过自己来创建自己的。

(typeof Function.__proto__) === function;//true
Function.__proto__=== Function.prototype;//true
Function这个函数对象,由其自身通过Function函数构造的。


结论7：函数也是对象，因为Function.prototype__proto__指向Object.prototype。

(typeof Function.prototype.__proto__) === "object";//true
Function.prototype.__proto__=== Object.prototype;//true


最后提一下：原型链是基于__proto__形成的，继承是通过prototype实现的。

每个对象都有一个__proto__属性，原型链上的对象正是依靠这个__proto__属性连结在一起的! 对于原型链上的一个对象obj，那么访问obj.xxx属性(方法也是属性)的过程是: 如果自身有xxx属性，则访问它；如果没有，就通过__proto__属性找到其原型链的上一级原型对象，看它有没有xxx属性，如此递归查找，直至找到xxx属性或到了原型链顶端Object.prototype对象为止。

函数拥有prototype属性，该属性值是一个object类型。当函数A创建对象B的时候，B对象的__proto__会指向A.prototype，这就是javascript的继承。
 */
function User(){
  User.prototype.sayHello = function() {};
};
var u1 = new User();
var u2 = new User();
console.log(u1.sayHello === u2.sayHello)
console.log(User.prototype === Function.prototype)
console.log(User.__proto__ === Function.prototype)
console.log(User.__proto__ === Function.__proto__)
console.log(u1.__proto__ === u2.__proto__)
console.log(u1.__proto__ === User.__proto__)
console.log(u1.__proto__ === User.prototype) //这里就是true了
console.log(Function.__proto__ === Object.__proto__)
console.log(Function.prototype.__proto__ === Object.prototype.__proto__) // 这里打印false  是因为内置的Function也是一个函数对象，它是通过自己来创建自己的
console.log(Function.prototype.__proto__ === Object.prototype) // 这里就是true了