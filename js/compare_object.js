var Person = function(name) {
    this.name = name
}

var p1 = new Person('p1')
var p2 = new Person('p2')

// false
// 如果等号两边是对象或者对象的函数，则比较内存地址是否相等（即判断两者是否引用的同一对象）
// 每生成一个实例就会重新占用一些内存”，所以两次生成的person占用的是不同的内存地址。所以返回结果是false。

console.log(p1 == p2)

Person.prototype.sayHi = function() {
    //
}

// true
console.log(p1.sayHi() == p2.sayHi())

// true
console.log(p1.sayHi() === p2.sayHi())


var a = {data: [20, 20], value: 20};
var b = {data: [20, 20], value: 20};
// false
// object永远不等于object（object != object）
console.log(a == b)
// true
console.log(JSON.stringify(a) == JSON.stringify(b))


var a = {data: [20, 20], value: 20};
var b = {data: [10, 30], value: 10};
// 比较两个object时，会先调用object的valueOf方法，再对其结果进行比较。
a.valueOf = function () {
  return this.value;    // 20
};
b.valueOf = function () {
  return this.value;    // 10
};
a > b  // true

a.valueOf = function () {
  return this.data;    // [20, 20]
};
b.valueOf = function () {
  return this.data;    // [10, 30]
};
a > b;    // false
a < b;    // false

// 当调用valueOf方法无法比较其大小时，会调用object的toString方法，再对其结果进行比较。
a.toString = function () {
  return this.value;    // 20
};
b.toString = function () {
  return this.value;    // 10
};
a > b;    // true
a < b;    // false

a.valueOf = function () {
  return 10;    // 10
};
b.valueOf = function () {
  return 30;    // 30
};
a > b;    // false
a < b;    // true


// 总结：
// 1. object != object 两个对象永远不可能相等, 但是引用同一个对象的两个变量，是全相等的。
var a = {}
var b = a
a === b; // true
{} != {}; // ture

// 2. object.valueOf()
// 当比较两个object大小时，会调用object的valueOf方法，如果结果能直接直接比较大小，则返回比较的结果

// 3. object.toString()
// 当比较两个object大小时，会调用object的valueOf方法，如果结果不能直接直接比较大小，则会调用object的toString方法，并返回比较结果。
