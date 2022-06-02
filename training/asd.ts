
type accesLevel = 'standard' | 'extra';

class Guest {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayHello() {
        console.log(`Hi, my name is ${this.firstName}${this.lastName}`);
    }

}


class Employee extends Guest {
    permissionLevel: accesLevel;

    constructor(firstName: string, lastName: string, permissionLevel: accesLevel) {
        super(firstName, lastName)
        this.permissionLevel = permissionLevel;
    }

    welcomeGuest(guestInstance: Guest) {

const constructorName = this.constructor.name

        if (constructorName === "Director" || constructorName === "Clerk" && this.permissionLevel === "extra") {
           console.log(`Welcome, ${guestInstance.firstName} ${guestInstance.lastName}`);
        } else if (constructorName === "Employee" && this.permissionLevel === "extra") {
            console.log(`Welcome, ${guestInstance.firstName} ${guestInstance.lastName}. What can I do for you?`)
       }
        
    }
}

class Clerk extends Employee {
    constructor(firstName: string, lastName: string, permissionLevel: accesLevel) {
        super(firstName, lastName, permissionLevel);
    }
}

class Director extends Employee {
    constructor(firstName: string, lastName: string, permissionLevel: accesLevel) {
        super(firstName, lastName, permissionLevel);
    }
}