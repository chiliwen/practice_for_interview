// apply和call都是为了改变某个函数运行时的上下文而存在的（即为了改变函数内部this的指向）

var numbers = [5, 458, 120, -215]

// this 是指向 apply 或 call 的第一个参数

// apply 的第二个参数是一个参数数组
var maxInNumbers = Math.max.apply(Math, numbers)

// call 的第二个及以后的参数都是数组里面的元素，即全部列举出来
var maxInNumbers = Math.max.call(Math, 5, 458, 120, -215)

// bind() 也是改变函数体内this的指向，bind会创建一个绑定函数，
// 当调用这个函数时，绑定函数会以创建它时传入bind()方法的第一个参数作为this，
// 传入bind()方法的第二个及以后的参数加上绑定函数运行时本身的参数按顺序作为
// 原函数的参数来调用原函数

//  bind与call apply 最大区别：bind不会立即调用 而且只能调用一次
var fn = {
    _int : 2,
    fun: function() {
        document.querySelector('#box').onclick = (function() {
            console.log(this._int)
        }).bind(this)
        // 这里的this是fn，可以正常地访问_int
        // 使用bind，会在点击之后打印出来
        // 使用call或apply，在刷新网页时打印
    }
}

fn.fun()
