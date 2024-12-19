import jwt from 'jsonwebtoken';
import { Role } from '../types';

interface JwtPayload {
    email: string;
    role: Role;
    userId: number;
}

const generateJwtToken = ({ email, role }: { email: string; role: Role }): string => {
    const options = {
        expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`,
        issuer: 'http://localhost:3000',
    };

    try {
        return jwt.sign({ email, role }, process.env.JWT_SECRET!, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

export { generateJwtToken };
