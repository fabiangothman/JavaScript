export class User{
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

    public payInvoice = (): void => {
        document.write(`User ${this.name} has paid successfully the invoice!.<br />`);
    }
}