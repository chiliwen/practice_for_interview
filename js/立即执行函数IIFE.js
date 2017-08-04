// 常见写法
// 无论何时，给立即执行函数加上括号是个好习惯
(function() {

}())

(function() {

})()

//
var i = function() {
    return 10
}()

// 上面的写法没有问题，但是更推荐下面的写法
// var i = (function() {
//     return 10
// }())

true && function() {
    //
}()

0, function() {
    //
}()

//
!function() {
    //
}()

~function() {
    //
}()

-function() {
    //
}()

+function() {
    //
}()

//
new function() {}
new function() {}()




// i 的值没有被锁住，当点击链接时，for循环已经执行完了
// i的值其实已经是elems.length了
var elems = document.querySelector('a')
for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', function(e) {
        e.preventDefault()
        alert('I am link #' + i)
    }, 'false')
}

// 立即执行函数能配合闭包保存状态。
// 在立即执行函数内部，i的值传给了j，并且被锁在内存中
// 尽管for循环结束后i的值已经改变，但是立即执行函数内部j的值并不会改变
var elems = document.querySelector('a')
for (var i = 0; i < elems.length; i++) {
    (function(j) {
        elems[i].addEventListener('click', function(e) {
            e.preventDefault()
            alert('I am link #' + j)
        }, 'false')
    })(i)
}

var elems = document.querySelector('a')
for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', (function(j) {
        e.preventDefault()
        alert('I am link #' + j)
    }(i), 'false')
}



// 该函数返回一个对象，包含你要暴露的属性
// 如下代码如果不使用立即执行函数，就会多一个属性i
var counter = (function() {
    var i = 0
    return {
        get: function() {
            return i
        },
        set: function(val) {
            i = val
        },
        increment: function() {
            return ++i
        }
    }
}())

console.log(counter.get())
counter.set(3)
console.log(counter.increment())
console.log(counter.increment())
// undefined (i并不是counter的属性)
counter.i
