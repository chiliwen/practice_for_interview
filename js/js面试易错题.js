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

// 1.3 函数作用域中，a 被重新赋值，未被重新声明，且位于console之下，所以输出全局作用域中的 a
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

// 3.4
/*
this 的四种类型：
    1. 默认绑定：什么都匹配不到的情况下，非严格模式this绑定到全局对象window或global,严格模式绑定到undefined;
    2. 隐式绑定：函数作为对象的属性，通过对象属性的方式调用，这个时候this绑定到对象;
    3. 显示绑定：通过apply和call调用的方式;
    4. new绑定：通过new操作符时将this绑定到当前新创建的对象中，它们的匹配有限是是从小到大的。
*/
var length = 10;
function fn() {
    console.log(this.length)
};
var obj = {
    length: 5,
    method: function (fn) {
        fn();
        // 通过对象的属性去调用（数组的默认属性类型是数值而普通对象的属性类型是字符串）
        // 而arguments确实存在一个length属性，并且值为2
        arguments[0]();
        fn.call(obj, 12);
    }
};
/* obj.method(fn, 1) 这句代码对应：
    fn();
    arguments[0]();
    fn.call(obj, 12);
*/
// 10 2 5
obj.method(fn, 1);



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



// 循环内使用闭包
// 闭包可以创建私有变量、创建私有函数
/* 循环一个数组，并在3秒后打印出每个数组元素的索引 */
// 错误：setTimeout会创建一个闭包，它可以读取外部作用域，每个循环都包含了索引i
// 函数在3秒后执行，它打印出外部作用域中i的值，循环结束后i等于4
const arr = [10, 12, 15, 20]
for (var i = 0; i < arr.length; i++) {
    setTimeout(function() {
        console.log('The index of this number is:' + i)
    }, 3000)
}

// 正确
const arr = [10, 12, 15, 20]
for (var i = 0; i < arr.length; i++) {
    setTimeout(function(i_local) {
        return function() {
            console.log('The index of this number is:' + i_local)
        }
    }, 3000)
}

const arr = [10, 12, 15, 20]
for (let i = 0; i < arr.length; i++) {
    setTimeout(function() {
            console.log('The index of this number is:' + i)
    }, 3000)
}


// 函数防抖
function debounce(fn, delay) {
    let timer = null
    return function() {
        let context = this
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    }
}

function foo () {
    console.log('You are scrolling!')
}
let elem = document.getElemnetById('container')
elem.addEventListener('scroll', debounce(foo, 2000))



//
