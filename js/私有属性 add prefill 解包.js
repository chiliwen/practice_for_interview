

// function add (x, y) {
//     var sum = x
//     if (y) {
//         return (sum + y)
//     } else {
//         var add2 = function(z) {
//             return (sum + z)
//         }
//         return add2
//     }
// }
//
// console.log(add(2)(3))

// 柯里化
function add(x) {
    var sum = x

    function tmp(y) {
        sum += y
        return tmp
    }

    tmp.toString = function() {
        return sum
    }

    return tmp
}
console.log(add(1)(3)(6)(89)(98))


// 私有属性 共有属性
function container () {
    this.attr1 = 1
    var attr2 = 2

    this.getAttr2 = function() {
        return attr2
    }

    this.setAttr2 = function(set) {
        attr2 = set
    }
}

var obj = new container()
console.log('这是公有属性：', obj.attr1,
            '这是私有属性：', obj.attr2)

console.log('利用闭包访问私有属性：', obj.getAttr2())

obj.setAttr2(3)
console.log('利用闭包set私有属性：', obj.getAttr2())


// prefill
function out (n, v) {
    var r = []
    function arr (n , v) {
        if (n > 0) {
            r.push(v)
            arr(n - 1, v)
        }
        return r
    }
    return arr(n, v)
}


function vfunc (n, v) {
    if (n === 0) {
        return []
    } else {
        --n
        return [...(vfunc(n, v)), v]
    }
}


// 解包
var [a, b] = [1, 2]
[a, b] = [b, a]
