// src/model/user.ts
import bcrypt from 'bcryptjs';

export class User {
    readonly id: number;
    private email: string;
    private password: string;
    private name: string;
    private age: number;

    constructor(user: { id?: number; email: string; password: string; name: string; age: number }) {
        this.id = user.id || 0;
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.age = user.age;
    }

    static async createUser(user: {
        id?: number;
        email: string;
        password: string;
        name: string;
        age: number;
    }): Promise<User> {
        // Hash password before creating user
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return new User({
            ...user,
            password: hashedPassword,
        });
    }

    // Existing getters
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

    // Existing setters
    setName(name: string): void {
        this.name = name;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    async setPassword(password: string): Promise<void> {
        this.password = await bcrypt.hash(password, 10);
    }

    setAge(age: number): void {
        this.age = age;
    }

    // Method to return user data without sensitive information
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            age: this.age,
        };
    }
}
