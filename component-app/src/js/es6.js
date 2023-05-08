
const javacript_es6 = () => {
    

    // 1.let, const 会创建块级作用域，不会像 var 声明变量一样会被提升

    // 2.const 表示无法修改变量的原始值。需要注意的是，const表示对值的常量引用，咱们可以改变被引用的对象的属性值，但不能改变引用本身。

    // 3.ES6 引入了对类(class关键字)、构造函数(constructor关键字)和 extend 关键字(用于继承)的语言支持。

    // 4.展开操作符
    // const obj1 = { a: 1, b: 2 }
    // const obj2 = { a: 2, c: 3, d: 4}
    // const obj3 = {...obj1, ...obj2}  

    //  5.Promise

    //  6.模块导出
    // const myModule = { x: 1, y: () => { console.log('This is ES5') }}
    // export default myModule;   
    // import myModule from './myModule';

    // 7. 箭头函数


    // 8.Symbol
    /*
        1.Symbol 用于创建独一无二的标识符，可以用作对象的属性名或方法名，避免了因命名冲突而产生的错误。
         可以用于对象的属性名、方法名、私有成员、常量、枚举类型等场景，从而提高程序的可读性、可维护性和安全性
        2.创建私有成员或常量：Symbol 可以用于创建私有成员或常量，通过将 Symbol 作为对象属性的 key，来防止属性被意外修改   
        3.作为枚举类型：Symbol 可以用于定义枚举类型，将不同的枚举值映射到不同的 Symbol 上，从而实现枚举类型的效果。
     */
        // const name = Symbol('name')
        // const symbole_obj = {
        //     name: 'Alice' // 避免name属性被意外修改
        // }
    
        // 系统中或许存在很多个叫张三、李四的人。但在这里用Symbol声明一个独一无二的张三，避免命名重复
        // 如果不用Symbol，就需要业务前缀严格区分。这种情况在redux属性命名上很常见。
        // const zhangsan = Symbol('zhangsan'); 
        // const lisi = Symbol('lisi');

    
    // 展开语法 const copyOfTodd = { ...person };  剩余语法  const [a, b, ...rest] = arr;
    // 轻松地创建数组或对象的副本

    //
    
}

javacript_es6()