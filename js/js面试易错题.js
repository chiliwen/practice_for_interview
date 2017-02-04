// 1. 变量和作用域
// 1.1 函数作用域中声明并赋值了a，且在console之上，遵循就近原则
var a = 1
function test() {
    var a = 2
    // 2
    console.log(a)
}
test()

// 1.2 函数作用域中虽然声明并赋值了a，但是位于console下，a变量被提升，输出时已声明但未被赋值
var a = 1
function test2() {
    // undefined
    console.log(a)
    var a = 2
}
test2()

// 1.3 函数作用域中，a 被重新赋值，未被重新声明，且位于console之下，所以输入全局作用域中的 a
var a = 1
function test3() {
    // 1
    console.log(a)
    a = 2
}
test3()

// 1.4 let不同于var 其不存在变量提升的功能
let b = 1
function test4() {
    // b is not defined
    console.log(b)
    let b = 2
}
test4()

// 1.5 console并不在函数内的块级作用域中
function test5() {
    let a = 1
    {
        let a = 2
    }
    // 1
    console.log(a)
}
test5()

// 2. 类型比较
// 2.1 不同的数组作比较
var arr = [],
    arr2 = [1]
// false
console.log(arr === arr2)

// 2.2 两个相同的数组作比较，两个单独的数组永不相等
var arr = [],
    arr2 = {}
// false
console.log(arr === arr2)

// 2.3 利用typeof比较数组和对象，typeof获取null、数组、对象的类型都是object
var arr = []
var arr2 = {}
// true
console.log(typeof(arr) === typeof(arr2))

// 2.4 利用instanceof 判断一个变量是否属于某个对象的实例
var arr = []
// true
console.log(arr instanceof Object)
// true
console.log(arr instanceof Array)

// 3. this指向

// 3.1 this指向对象本身
var obj = {
    name: 'gua',
    getName: function() {
        return this.name
    }
}
// 'gua'
console.log(obj.getName())

// 3.2 将对象的方法赋给了一个变量，这时this不再指向obj，而是指向window
var obj = {
    myName: 'gua',
    getName: function() {
        return this.name
    }
}
var nameFn = obj.getName
// undefined
console.log(nameFn())

// 3.3 通过apply方法将this指向了obj2
var obj = {
    myName: 'gua',
    getName: function(){
        return this.name
    }
}

var obj2 = {
    myName: 'xiao'
}

var nameFn = obj.getName
// 'xiao'
console.log(nameFn.apply(obj2))


// 4. 函数参数

// 4.1 利用函数中的arguments类数组对象获取传入函数的参数数组
function test6() {
    // [1, 2]
    console.log(Array.prototype.slice.call(arguments))
}
test6(1, 2)

// 4.2 test7()未执行return中的函数
function test7 () {
    return function () {
        // 为执行到此，无输出
        console.log(Array.prototype.slice.call(arguments))
    }
}
//
test(1, 2)
// [3, 4]
test(1, 2)(3, 4)

// 4.3 利用 Array.prototype.push.call()方法向数组插入3和4，
// 并利用ES6延展操作符(...)将数组展开并传入test9
var args = [1, 2]
function test9 () {
    // [1, 2, 3, 4]
    console.log(Array.prototype.slice.call(arguments))
}
Array.prototype.push.call(args, 3, 4)

test9(...args)

// 5 闭包

// 5.1
// 如果页面上有5个div
var elem = document.getElementsByTagName('div')

for (var i = 0; i < elem.length; ++i) {
    elem[i].onclick = function() {
        // 总是 5
        alert(i)
    }
}

// 解决方法：在点击事件外部封装一个立即执行函数，并将i传入这个函数
var elem = document.getElementsByTagName('div')

for (var i = 0; i < elem.length; i++) {
    (function(w) {
        elem[w].onclick = function() {
            alert(w)
        })(i)
    }
}

// 6. 对象拷贝和赋值
// 6.1 newObj对象只是获得了一个内存地址，而不是真正的拷贝，即浅拷贝，故obj对象被篡改
var obj = {
    name: 'gua',
    age: 28
}

var newObj = obj
newObj.name = 'xiao'
// 'xiao'
console.log(obj.name)
// 'xiao'
console.log(newObj.name)

// 6.2 用 Object.assign 方法进行对象的深拷贝可以避免源对象被篡改的可能
// Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象
// 不过 Object.assign() 只是一级属性复制
var obj2 = {
    name: 'gua',
    age: 28
}

var newObj2 = Object.assign({}, obj2, {color: 'blue'})
newObj2.name = 'xiao'
// 'gua'
console.log(obj2.name)
// 'xiao'
console.log(newObj2.name)
// 'blue'
console.log(newObj2.color)

// 6.3 使用Object.create()进行对象的拷贝，它可以创建一个具有指定原型对象和属性对象的新对象
var obj3 = {
    name: 'gua',
    age: 28
}
var newObj3 = Object.create(obj3)
newObj3.name = 'xiao'
// 'gua'
console.log(obj3.name)
// 'xiao'
console.log(newObj3.name)
