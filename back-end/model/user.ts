export class User {
    readonly id?: number;
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly age: number;

    constructor(user: {
        id?: number;
        email: string;
        password: string;
        name: string;
        age: number;
    }) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.age = user.age;
    }

    getId(): number | undefined {
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

    equals(user: User): boolean {
        return (
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.name === user.getName() && 
            this.age === user.getAge()
        );
    }
    
}



