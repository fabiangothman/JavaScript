class User{
    public name: string;
    private email: string;
    private age: number;

    constructor(name: string, email: string, age: number){
        this.name = name;
        this.email = email;
        this.age = age;
    }

    public getEmail(): string{
        return this.email;
    }
    public setEmail(email: string): void{
        this.email = email;
    }

    public getAge(): number{
        return this.age;
    }
    public setAge(age: number): void{
        this.age = age;
    }

    public ageInMonths = (): number => {
        return this.age*12;
    }

    public register = (): void => {
        document.write(`User ${this.name} registered successfully!.<br />`);
    }
}
let user1 = new User("John", "john@correo.com", 24);
user1.name = "Johna";
document.write(`The user's name is ${user1.name}.<br />`);
user1.setEmail("johna@correo.com");
document.write(`The user's email is ${user1.getEmail()}.<br />`);
user1.setAge(25);
document.write(`The user's age is ${user1.getAge()}.<br />`);
document.write(`The user's age in months is ${user1.ageInMonths()}.<br />`);
user1.register();