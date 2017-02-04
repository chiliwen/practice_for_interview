// 单态性
var func = function(a, b) {

    // expect a, b to be numeric
    console.log(++a * ++b)
}

// bad
func()
// still bad
func(1)
// dammit meg
func('1', 2)
// good
func(1, 2)

// 常量
const a = 42
// need resolve this expression
const b = 1337 * 2
// still can be resolved
const c = a + b
// can only unfold 'c'
const d = Math.random() * c

// before unfolding
a
b
c
d

// after unfolding
42
2674
2716
Math.random() * 2716


// 内联

// 数据类型
const ROBOT = 0
const HUMAN = 1
const SPIDER = 2

let E_TYPE = {
    Robot : ROBOT,
    Human : HUMAN,
    Spider : SPIDER
}

// bad
if (entity.type === 'Robot') {

}

// good
if (entity.type === E_TYPE.Robot) {

}

// perfect
if (entity.type === ROBOT) {

}

// Strict & Abstract Operators
// 严格比较操作符 ===


// Strict Conditions
let a = 2

// bad
if (a) {
    // if a is true, do something
}

// good
if (a === 2) {
    // do sth
}

// same goes for function
function b() {
    return (!false)
}

if (b()) {
    // get in here slow
}

if (b() === true) {
    // get in here fast
}


// Arguments
// 尽量避免使用argument[index]方式进行参数获取，尽量避免修改传入的参数变量

function mul(a, b) {
    // bad, very slow
    return (arguments[0] * arguments[1])
    // good
    return (a * b)
}

function test(a, b) {
    // bad
    a = 5
    // good
    let tmp = a
    // we can now modify our fake 'a'
    tmp *= 2
}

// Toxicity: 这些关键字有毒

// Toxicity:
/* 以下几个语法特性会影响优化进程 */
// eval
// with
// try/ catch
/* 尽量避免在函数内声明函数或闭包 */

// Objects
/* 实例通常会共享隐类，所以访问或设置某个实例的未预定义变量值时会创建一个隐类 */

// our hidden class 'hc_0'
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
// both vector objects share hidden class 'hc_0'
let vec1 = new Vector(0, 0)
let vec2 = new Vector(2, 2)

// bad, vec2 got hidden class 'hc_0' now
vec2.z = 0

// good, compiler knows this member
vec2.x = 1


// Loops
// 尽可能地缓存数组长度的计算值，并尽可能在同一个数组中存放单个类型
// 避免使用for-in 语法遍历某个数组（太慢）
// continue 和 break 在循环中的性能不错
// 将短小的逻辑部分拆分到独立的函数中
// 使用前缀自增

// bad, don't mix types
let badarray = [1, true, 0]
// good
let array = [1, 0, 1]

// bad
for(let key in array) {

}

// better but always try to cache the array size
let i = 0
for (; i < array.length; ++i) {
    key = array[i]
}

// good
let i = 0
let key = null
let length = array.length
for (; i < length; ++i) {
    key = array[i]
}


// drawImage
// bad
ctx.drawImage(
    img,
    x, y
)

// good
ctx.drawImage(
    img,
    // clipping
    sx, sy,
    sw, sh,
    // actual stuff
    x, y,
    w, h
)

// much hax
// no subpixel rendering by passing integers
ctx.drawImage(
    img,
    sx|0, sy|0,
    sw|0, sh|0,
    x|0, y|0,
    w|0, h|0
)
