// Execute: npx ts-node util/seed.ts
import { set } from 'date-fns';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Clear existing data
    await prisma.hardwareComponentToSetup.deleteMany();
    await prisma.hardwareComponent.deleteMany();
    await prisma.user.deleteMany();

    // Create users
    const users = await Promise.all([
        prisma.user.create({
            data: {
                password: await bcrypt.hash('lindas123', 12),
                name: 'linda',
                email: 'linda.lawson@ucll.be',
                role: 'admin',
                age: 23,
            },
        }),
        prisma.user.create({
            data: {
                password: await bcrypt.hash('john123', 12),
                name: 'john',
                email: 'john.doe@example.com',
                role: 'user',
                age: 28,
            },
        }),
    ]);

    // Create hardware components
    const hardwareComponents = await Promise.all([
        prisma.hardwareComponent.create({
            data: {
                name: 'NVIDIA GeForce RTX 3080',
                details: 'High-end graphics card with ray tracing capabilities',
                price: 699.99,
            },
        }),
        prisma.hardwareComponent.create({
            data: {
                name: 'AMD Ryzen 9 5900X',
                details: '12-core, 24-thread processor',
                price: 549.99,
            },
        }),
        prisma.hardwareComponent.create({
            data: {
                name: 'Samsung 970 EVO Plus 1TB',
                details: 'NVMe M.2 SSD with high read/write speeds',
                price: 169.99,
            },
        }),
        prisma.hardwareComponent.create({
            data: {
                name: 'Corsair Vengeance LPX 32GB',
                details: 'DDR4 3200MHz RAM kit',
                price: 159.99,
            },
        }),
    ]);

    console.log('Seed data created:');
    console.log('Users:', users);
    console.log('Hardware Components:', hardwareComponents);
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
