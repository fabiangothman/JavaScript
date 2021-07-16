var User = /** @class */ (function () {
    function User(name, email, age) {
        var _this = this;
        this.ageInMonths = function () {
            return _this.age * 12;
        };
        this.register = function () {
            document.write("User " + _this.name + " registered successfully!.<br />");
        };
        this.name = name;
        this.email = email;
        this.age = age;
    }
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.setEmail = function (email) {
        this.email = email;
    };
    User.prototype.getAge = function () {
        return this.age;
    };
    User.prototype.setAge = function (age) {
        this.age = age;
    };
    return User;
}());
var user1 = new User("John", "john@correo.com", 24);
user1.name = "Johna";
document.write("The user's name is " + user1.name + ".<br />");
user1.setEmail("johna@correo.com");
document.write("The user's email is " + user1.getEmail() + ".<br />");
user1.setAge(25);
document.write("The user's age is " + user1.getAge() + ".<br />");
document.write("The user's age in months is " + user1.ageInMonths() + ".<br />");
user1.register();
