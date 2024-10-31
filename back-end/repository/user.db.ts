import { User } from '../model/user';

const users: User[] = [
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

const getNextId = (): number => {
    const maxId = users.reduce((max, user) => Math.max(max, user.getId()), 0);
    return maxId + 1;
};

const addUser = (user: User): User => {
    const newUser = new User({
        id: getNextId(),
        email: user.getEmail(),
        password: user.getPassword(),
        name: user.getName(),
        age: user.getAge(),
    });
    users.push(newUser);
    return newUser;
};

export default {
    getAllUsers,
    getUserById,
    addUser,
};
