// Module wrapper function
/*(function (exports, require, module, __filename, __dirname) {
    console.log(__filename)
})*/

class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        return `My name is ${this.name} and my age is ${this.age}`;
    }
}

module.exports = Person;