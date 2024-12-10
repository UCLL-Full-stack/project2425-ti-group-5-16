// src/model/user.ts
import { User as UserPrisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

export class User {
    private id: number;
    private email: string;
    private password: string;
    private name: string;
    private age: number;
    private role: Role;

    constructor(user: { id?: number; email: string; password: string; name: string; age: number }) {
        this.id = user.id || 0;
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.age = user.age;
        this.role = user.role;
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

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name
    }

    getPassword(): string {
        return this.password;
    }

    getEmail(): string {
        return this.email;
    }

    getAge(): number {
        return this.age;
    }

    getRole(): Role {
        return this.role;
    }

    validate(user: {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.name === user.getName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.age === user.getAge() &&
            this.role === user.getRole()
        );
    }

    static from({ id, name, email, password, age, role }: UserPrisma) {
        return new User({
            id,
            name,
            email,
            password,
            age,
            role: role as Role,
        });
    } 
}