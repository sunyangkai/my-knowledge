
const test_type_transfromation = () => {

    // JavaScript 的灵活性使得它适合用于编写动态和交互性的应用程序，因为这些应用程序通常需要快速响应用户的操作，并根据用户的行为动态地改变应用程序的行为和状态。
    // JavaScript 可以在运行时根据用户的输入和应用程序的状态来动态地修改变量的类型和值，从而实现这种灵活性。
    // 例如，一个网页应用程序可能需要根据用户的输入动态地更新页面上的内容，这个过程可能会涉及到大量的数据处理和操作。
    // JavaScript 的动态类型特性可以让开发者更加灵活地处理这些数据，并且不需要在运行之前就预先定义所有的变量类型。



    /*
        在if语句中，会触发Boolean上下文，JavaScript会将值强制类型转换为布尔值
        七种假值(又称虚值)，分别为undefined null "" false 0 0n NaN
        ==相等运算符，另一个是===全等运算符。它们最大区别在于对类型的宽容度。

        ==的运算规则：
        1.如果type(x) === type(y) , 此处比较过程与===相同；
        2.如果x is null，y is undefined，则返回true；反之亦然；
        3.如果x is string，y is number，则执行ToNumber(x) == y；反之亦然；
        4.如果x is boolean，则执行ToNumber(x) == y；反之亦然；
        5.如果x is object，则执行ToPrimitive(x) == y；反之亦然；
        都不是以上情况，返回false；

        ToNumber(x)
        1. x is undefined, return NaN;
        2. x is null, return 0;
        3. x is number, return x;
        4. x is boolean, return x === true ? 1 : 0;
        5. x is string, return [ToNumber Applied to the String Type](http://www.ecma-international.org/ecma-262/5.1/#sec-9.3.1);
        6. x is object, return ToNumber(ToPrimitive(x))

        ToPrimitive(x)
        1. x is object, return x.valueOf() or x.toString();
        2. x is non-object, return x;   

    */
        // Object.is()
        // 在ES6，新增了一种判断两个操作数是否相等的方法，也是最为严格的判等方式——Object.is()。使用它，可以确保两个操作一定是相等的，容不得一点沙子
        // Object.is()与===全等运算符的区别在于对待NaN，+0，-0的判定有所不同
        // NaN === NaN  // false
        // Object.is(NaN, NaN)  // true
        // +0 === -0  // true
        // Object.is(+0, -0)  // false
}



test_type_transfromation();