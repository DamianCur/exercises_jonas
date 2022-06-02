"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Guest = /** @class */ (function () {
    function Guest(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Guest.prototype.sayHello = function () {
        console.log("Hi, my name is ".concat(this.firstName).concat(this.lastName));
    };
    return Guest;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(firstName, lastName, permissionLevel) {
        var _this = _super.call(this, firstName, lastName) || this;
        _this.permissionLevel = permissionLevel;
        return _this;
    }
    Employee.prototype.welcomeGuest = function (guestInstance) {
        if ((this instanceof Clerk) || (this instanceof Director) && this.permissionLevel === "extra") {
            console.log("Welcome, ".concat(guestInstance.firstName, " ").concat(guestInstance.lastName));
        }
        if (this instanceof Employee && this.permissionLevel === "extra") {
            console.log("Welcome, ".concat(guestInstance.firstName, " ").concat(guestInstance.lastName, ". What can I do for you?"));
        }
        console.log(this.constructor);
    };
    return Employee;
}(Guest));
var Clerk = /** @class */ (function (_super) {
    __extends(Clerk, _super);
    function Clerk(firstName, lastName, permissionLevel) {
        return _super.call(this, firstName, lastName, permissionLevel) || this;
    }
    return Clerk;
}(Employee));
var Director = /** @class */ (function (_super) {
    __extends(Director, _super);
    function Director(firstName, lastName, permissionLevel) {
        return _super.call(this, firstName, lastName, permissionLevel) || this;
    }
    return Director;
}(Employee));
var emp = new Director('Damian', 'Cur', 'extra');
var guest = new Guest("Jan", "Kowalski");
emp.welcomeGuest(emp);
