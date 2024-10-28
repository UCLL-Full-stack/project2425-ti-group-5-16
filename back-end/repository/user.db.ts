import { User } from '../model/user';

const users = [
    new User({
        id: 1,
        email: 'john.doe@ucll.be',
        password: 'john123',
        name: 'John Doe',
        age: 30,
    }),
    new User({
        id: 2,
        email: 'jane.doe@ucll.be',
        password: 'jane123',
        name: 'Jane Doe',
        age: 25,
    }),
];

const getAllUsers = (): User[] => users;

const getUserById = ({ id }: { id: number }): User | null => {
    return users.find((user) => user.getId() === id) || null;
};

const addUser = (user: User): void => {
    users.push(user);
};

export default {
    getAllUsers,
    getUserById,
    addUser,
};
