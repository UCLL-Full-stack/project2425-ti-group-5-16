// src/service/user.service.ts
import userDB from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';

const getAllUsers = (): User[] => userDB.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDB.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const addUser = async ({ email, password, name, age }: Omit<UserInput, 'id'>): Promise<User> => {
    // BASIC VALIDATION
    if (!email) {
        throw new Error('Email is required');
    }
    if (!password) {
        throw new Error('Password is required');
    }
    if (!name) {
        throw new Error('Name is required');
    }
    if (!age) {
        throw new Error('Age is required');
    }

    // Check if email already exists
    const existingUser = userDB.getAllUsers().find((u) => u.getEmail() === email);
    if (existingUser) {
        throw new Error('Email already exists');
    }

    const newUser = await User.createUser({
        email,
        password,
        name,
        age,
    });

    return userDB.addUser(newUser);
};

export default { getAllUsers, getUserById, addUser };
