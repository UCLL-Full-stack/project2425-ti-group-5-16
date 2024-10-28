import userDB from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';

const getAllUsers = (): User[] => userDB.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDB.getUserById({ id });
    if (!user) throw new Error(`Lecturer with id ${id} does not exist.`);
    return user;
};

const addUser = ({ id, email, password, name, age }: UserInput): User => {
    // BASIC VALIDATION
    if (!id) {
        throw new Error('User ID is required');
    }
    if (userDB.getUserById({ id })) {
        throw new Error('User ID already exists');
    }
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

    const newUser = new User({
        id,
        email,
        password,
        name,
        age,
    });

    userDB.addUser(newUser);

    return newUser;
};

export default { getAllUsers, getUserById, addUser };
