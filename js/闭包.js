var count = function() {
    var arr = []
    for (var i = 1; i <= 4; i++) {
        (function(index) {
            arr.push(function() {
                return index * index;
            })
        })(i)
    }
}

    return arr;

var count = function() {
    var arr = []
    for (var i = 1; i <= 4; i++) {
        function(index) {
            arr.push(function() {
                return index * index
            })
        }
    }
    return arr
}


// 例1:
var f1 = function() {
    var n = 90
    function f2() {
        alert(n)
    }
    return f2
}

var result = f1()
result()

// 例2：
var f1 = function() {
    var n = 93

    nAdd = function() {
        n += 1
    }

    var f2 = function() {
            alert(n)
    }

    return f2
}

var result = f1()
result()
nAdd()
result()


// 思考题1：
// 先运行 xx = object.func()
// 再运行 xx()
// this 是全局对象
// 第一个的this指向自己，然后被window 给调用this 就成了window对象，它的name就是全局的name
var name = "The Window"
var object = {
    name : "My Object",
    getNameFunc : function() {
        return function() {
            return this.name
        }
    }
}
alert(object.getNameFunc()())

// 思考题2：
// that 为object对象
// 在调用前用that 保存了object 自己的this，所以that 就成为局部变量，在闭包内可以调用
var name = "The Windows"
var object = {
    name : "My Object",
    getNameFunc : function() {
        var that = this;
        return function() {
            return that.name
        }
    }
}
alert(object.getNameFunc()())
