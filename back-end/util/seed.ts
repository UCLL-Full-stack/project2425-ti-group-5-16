// Execute: npx ts-node util/seed.ts
import { set } from 'date-fns';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Clear existing data
    await prisma.hardwareComponentToSetup.deleteMany();
    await prisma.image.deleteMany(); // Add this line
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
    ]);

    // Create images
    const images = await Promise.all([
        prisma.image.create({
            data: {
                url: 'https://example.com/images/rtx3080.jpg',
                details: 'NVIDIA GeForce RTX 3080 product image',
            },
        }),
        prisma.image.create({
            data: {
                url: 'https://example.com/images/ryzen9.jpg',
                details: 'AMD Ryzen 9 5900X processor image',
            },
        }),
        prisma.image.create({
            data: {
                url: 'https://example.com/images/setup1.jpg',
                details: 'Gaming setup with RGB lighting',
            },
        }),
        prisma.image.create({
            data: {
                url: 'https://example.com/images/setup2.jpg',
                details: 'Professional workstation setup',
            },
        }),
    ]);

    console.log('Seed data created:');
    console.log('Users:', users);
    console.log('Hardware Components:', hardwareComponents);
    console.log('Images:', images);
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
