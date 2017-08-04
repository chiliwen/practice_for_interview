var log = console.log.bind(console)
// 稀疏数组

var arr = new Array(3)

// [undefined × 3]
log(arr)

// 3
log("arr.length: ", arr.length)

// undefined
log("arr[0]: ", arr[0])

// false
log(0 in arr)

// 没有返回值
arr.forEach(function(x, i) {
    console.log(i + ": " + x);
});

// 其他生成稀疏数组的情况
var arr = []
arr[0] = 0
arr[100] = 100
arr.forEach(function(x, i) {
    console.log(i + ". " + x + '\r\n')
})


// 密集数组

var arr = Array.apply(null, Array(3))

// [undefined, undefined, undefined]
console.log(arr)

// 3
console.log("arr.length: ", arr.length)

// undefined
console.log("arr[0]: ", arr[0])

// true
console.log(0 in arr)

//0: undefined 1: undefined 2: undefined
arr.forEach(function(x, i) {
    console.log(i + ": " + x);
})


// 对比 稀疏数组和密集数组的结果, 前三个返回值是一样的, 后两个不同
/* 原因分析: forEach 方法按升序为数组中含有效值的每一项执行一次callback 函数，
            那些已删除（使用delete方法等情况）或者未初始化的项将被跳过（但不包括那些值为 undefined 的项）（例如在稀疏数组上）
            callback 函数会被依次传入三个参数：
                1. 数组当前项的值
                2. 数组当前项的索引
                3. 数组对象本身
            forEach对于稀疏数组中的每个元素返回了kPresent = false
*/
