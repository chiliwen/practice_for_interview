// ES5 对数组增添的新方法

var log = console.log.bind(console)

var my_func = function (item) {
    if (item === 1) {
        log('t')
        return true
    } else {
        log('f')
        return false
    }
}

// init an array
var l = [0, 1, 2, 3, 4]

// map():返回一个新的Array，每个元素为调用func的结果
// log: f, t, f, f, f
// return [false, true, false, false, false]
l.map(my_func)

// filter():返回一个符合func条件的元素数组
// log: f, t, f, f, f
// return [1]
l.filter(my_func)

// some():返回一个boolean，判断是否有元素是否符合func条件
// log: f, t
// return: true
l.some(my_func)

// every():返回一个boolean，判断每个元素是否符合func条件
// log: f
// return: false
l.every(my_func)

// forEach():没有返回值，只是针对每个元素调用func
// log: f, t, f, f, f
// return: undefined
l.forEach(my_func)



// forEach 遍历数组
[].forEach(function(value, index, array) { // ... })

// jQuery的$.each 遍历数组或者类数组
$.each([], function(index, value, array) { // ... });


// for in 遍历对象 循环遍历对象的key
// 一般不推荐遍历数组，因为for in遍历后的不能保证顺序，
// 而且原型链上的属性也会被遍历到，因此一般常用来遍历非数组的对象并且使用hasOwnProperty()方法去过滤掉原型链上的属性

//"0"
//"1"
//"2"
//"3"
//"desc" 注意这里添加上去的属性也被遍历出来了
var myArry =[1,2,3,4];
myArry.desc ='four';
for(var value in myArry) { //循环key
    console.log(value)
}


// for of遍历对象
// 循环遍历对象的值，是遍历键值对后面的那一个value，与for in遍历key相反
// 这是最简洁、最直接的遍历数组元素的语法
// 这个方法避开了for-in循环的所有缺陷
// 与forEach()不同的是，它可以正确响应break、continue和return语句

//1
//2
//3
//4
var myArry =[1,2,3,4];
myArry.desc ='four';
for(var value of myArry){
    console.log(value)
}
