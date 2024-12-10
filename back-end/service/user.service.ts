import bcrypt from 'bcrypt';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ name }: { name: string }): Promise<User> => {
    const user = await userDB.getUserByName({ name });
    if (!user) {
        throw new Error(`User with username: ${name} does not exist.`);
    }
    return user;
};

const authenticate = async ({ name, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ name });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ name, role: user.getRole() }),
        name: name,
        role: user.getRole(),
    };
};

const createUser = async ({
    name,
    password,
    email,
    age,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByName({ name });

    if (existingUser) {
        throw new Error(`User with username ${name} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, password: hashedPassword, email, age, role });

    return await userDB.createUser(user);
};

export default { getUserByUsername, authenticate, createUser, getAllUsers };
