import { User } from "./User";

class Member extends User{
    id: number;

    constructor(id: number, name: string, email: string, age: number){
        super(name, email, age);    //Inherits from parent class
        this.id = id;
    }
}

var user1 = new Member(1, "John", "john@correo.com", 24);
user1.payInvoice();