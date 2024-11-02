// src/service/auth.service.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userDB from '../repository/user.db';
import { User } from '../model/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable in production

class AuthService {
    async login(email: string, password: string) {
        // Find user by email
        const user = userDB.getAllUsers().find((u) => u.getEmail() === email);

        if (!user) {
            throw new Error('User not found');
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.getPassword());

        if (!isValidPassword) {
            throw new Error('Invalid password');
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.getId(),
                email: user.getEmail(),
                name: user.getName(),
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            token,
            user: {
                id: user.getId(),
                email: user.getEmail(),
                name: user.getName(),
                age: user.getAge(),
            },
        };
    }

    verifyToken(token: string) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

export default new AuthService();
