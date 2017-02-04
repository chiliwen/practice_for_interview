

var arr = ['vue', 'angular', 'react']
// 浅拷贝
var arr1 = arr
arr1[1] = 'ember'
// 输出：数值的原始值：vue, ember, react
// 显然这是我们不想得到的
document.writeln('数组的原始值：' + arr + '<br />')
// 输出：数值的新值：vue, ember, react
document.writeln('数组的新值：' + arr1 + '<br />')


// 解决方法1
var arr = ['vue', 'angular', 'react']
var arr2 = arr.slice(0)
arr2[1] = 'jQuery'
// 输出：数值的原始值：vue, angular, react
document.writeln('数组的原始值：' + arr + '<br />')
// 输出：数值的新值：vue, jQuery, react
document.writeln('数组的新值：' + arr2 + '<br />')

// 解决方法2
var arr = ['vue', 'angular', 'react']
var arr3 = arr.concat()
arr3[1] = 'JavaScript'
// 输出：数值的原始值：vue, angular, react
document.writeln('数组的原始值：' + arr + '<br />')
// 输出：数值的新值：vue, JavaScript, react
document.writeln('数组的新值：' + arr3 + '<br />')


var a = {
    name: 'mrr',
    age: '28'
}
var b = new Object()

// 对象的深浅拷贝
b.name = a.name
b.age = a.age
a.name = 'gua'
// Object { name='mrr', age=28 }
console.log(b)
// Object { name='gua', age=28 }
console.log(a)

// 把对象的属性遍历一遍，赋给一个新的对象
var deepCopy = function(src) {
    var result = {}
    for (var key in src) {
        result[key] = typeof src[key] === 'object'? deepCopy(src[key]): src[key]
    }
    return result
}
// Object {name: "gua", age: "28"}
deepCopy(a)
// Object {name: "mrr", age: "28"}
deepCopy(b)


//
var d = document
d.by = function(id) {
    return d.getElementById(id)
}
d.by('id').innerHTML = 'hello sentsin'
// 验证
document.hasOwnProperty('by')


var person = {name: '贤心', profession: '前端开发', place: '杭州'};
var newPerson = person;
newPerson.age = '24';
console.log(person);
//结果：{name: '贤心', profession: '前端开发', place: '杭州', age: 24}

// 对象克隆
/* JSON对象及其成员方法stringify和parse属于ECMAScript5规范，
 * 它们分别负责将一个对象（包括数组对象）转换成字符串，和还原，从而实现对象的深拷贝。
 * 那么对于低级浏览器（如IE），拷贝数组的话，可以用newobj.concat(obj)，
 * 而普通对象，就索性枚举赋值好了。
 */
var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ?
            cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};

//测试
var obj = {a: 0, b: 1, c: 2};
var arr = [0, 1, 2];
//执行深度克隆
var newobj = cloneObj(obj);
var newarr = cloneObj(arr);
//对克隆后的新对象进行成员删除
delete newobj.a;
newarr.splice(0,1);
console.log(obj, arr, newobj, newarr);
//结果： {a: 0, b: 1, c: 2}, [0, 1, 2], {b: 1, c: 2}, [1, 2];
