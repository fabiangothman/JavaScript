"use strict";
exports.__esModule = true;
exports.User = void 0;
var User = /** @class */ (function () {
    function User(name, email, age) {
        var _this = this;
        this.ageInMonths = function () {
            return _this.age * 12;
        };
        this.register = function () {
            document.write("User " + _this.name + " registered successfully!.<br />");
        };
        this.payInvoice = function () {
            document.write("User " + _this.name + " has paid successfully the invoice!.<br />");
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
exports.User = User;
