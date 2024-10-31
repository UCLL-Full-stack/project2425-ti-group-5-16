export class User {
    readonly id: number;
    private email: string;
    private password: string;
    private name: string;
    private age: number;

    constructor(user: {
        id?: number; // Make id optional in constructor
        email: string;
        password: string;
        name: string;
        age: number;
    }) {
        this.id = user.id || 0; // Temporary ID that will be overwritten
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.age = user.age;
    }

    // GETTERS

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getAge(): number {
        return this.age;
    }

    // SETTERS

    setName(name: string): void {
        this.name = name;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setAge(age: number): void {
        this.age = age;
    }
}
