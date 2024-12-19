import { set } from 'date-fns';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Clear existing data
    await prisma.hardwareComponentToSetup.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.setup.deleteMany();
    await prisma.image.deleteMany();
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
        prisma.user.create({
            data: {
                password: await bcrypt.hash('max123', 12),
                name: 'max',
                email: 'max.mustermann@example.com',
                role: 'user',
                age: 35,
            },
        }),
        prisma.user.create({
            data: {
                password: await bcrypt.hash('guest123', 12),
                name: 'guestuser',
                email: 'guestuser@example.com',
                role: 'guest',
                age: 35,
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
                name: 'Corsair Vengeance LPX 16GB',
                details: 'High-performance DDR4 memory',
                price: 89.99,
            },
        }),
        prisma.hardwareComponent.create({
            data: {
                name: 'Samsung 970 EVO Plus 1TB',
                details: 'NVMe M.2 SSD with high-speed performance',
                price: 129.99,
            },
        }),
        prisma.hardwareComponent.create({
            data: {
                name: 'NZXT H510 Elite',
                details: 'Mid-tower ATX case with tempered glass',
                price: 149.99,
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
        prisma.image.create({
            data: {
                url: 'https://example.com/images/setup3.jpg',
                details: 'Minimalist white-themed setup',
            },
        }),
        prisma.image.create({
            data: {
                url: 'https://example.com/images/setup4.jpg',
                details: 'Home office setup with dual monitors',
            },
        }),
    ]);

    // Create setups with comments
    const setups = await Promise.all([
        prisma.setup.create({
            data: {
                details: 'High-end gaming setup with RGB lighting',
                lastUpdated: new Date(),
                ownerId: users[0].id,
                images: {
                    connect: [{ id: images[2].id }],
                },
                hardwareComponents: {
                    create: [
                        {
                            hardwareComponent: {
                                connect: { id: hardwareComponents[0].id },
                            },
                        },
                        {
                            hardwareComponent: {
                                connect: { id: hardwareComponents[2].id },
                            },
                        },
                    ],
                },
                comments: {
                    create: [
                        {
                            content: 'Amazing setup! Love the RGB lighting!',
                            userId: users[1].id,
                            createdAt: new Date('2023-01-15T10:00:00Z'),
                        },
                        {
                            content: 'Thanks! The RGB really adds to the atmosphere.',
                            userId: users[0].id,
                            createdAt: new Date('2023-01-15T11:30:00Z'),
                        },
                    ],
                },
            },
        }),
        prisma.setup.create({
            data: {
                details: 'Professional workstation for content creation',
                lastUpdated: new Date(),
                ownerId: users[1].id,
                images: {
                    connect: [{ id: images[3].id }],
                },
                hardwareComponents: {
                    create: [
                        {
                            hardwareComponent: {
                                connect: { id: hardwareComponents[1].id },
                            },
                        },
                        {
                            hardwareComponent: {
                                connect: { id: hardwareComponents[3].id },
                            },
                        },
                    ],
                },
                comments: {
                    create: [
                        {
                            content: "How's the Ryzen 9 performing for your workload?",
                            userId: users[0].id,
                            createdAt: new Date('2023-01-16T09:00:00Z'),
                        },
                        {
                            content: 'It handles everything I throw at it with ease!',
                            userId: users[1].id,
                            createdAt: new Date('2023-01-16T09:45:00Z'),
                        },
                        {
                            content: 'Great to hear! Might upgrade mine soon.',
                            userId: users[0].id,
                            createdAt: new Date('2023-01-16T10:15:00Z'),
                        },
                    ],
                },
            },
        }),
        prisma.setup.create({
            data: {
                details: 'Minimalist white-themed setup for productivity',
                lastUpdated: new Date(),
                ownerId: users[0].id,
                images: {
                    connect: [{ id: images[4].id }],
                },
                hardwareComponents: {
                    create: [
                        {
                            hardwareComponent: {
                                connect: { id: hardwareComponents[4].id },
                            },
                        },
                    ],
                },
                comments: {
                    create: [
                        {
                            content: 'This looks so clean and organized!',
                            userId: users[1].id,
                            createdAt: new Date('2023-01-20T11:00:00Z'),
                        },
                    ],
                },
            },
        }),
        prisma.setup.create({
            data: {
                details: 'Home office setup with dual monitors for coding',
                lastUpdated: new Date(),
                ownerId: users[2].id,
                images: {
                    connect: [{ id: images[5].id }],
                },
                hardwareComponents: {
                    create: [
                        {
                            hardwareComponent: {
                                connect: { id: hardwareComponents[3].id },
                            },
                        },
                    ],
                },
                comments: {
                    create: [
                        {
                            content: 'Love the dual monitors setup. Super efficient!',
                            userId: users[0].id,
                            createdAt: new Date('2023-01-25T09:30:00Z'),
                        },
                        {
                            content: 'Thanks! Makes multitasking much easier.',
                            userId: users[2].id,
                            createdAt: new Date('2023-01-25T10:00:00Z'),
                        },
                    ],
                },
            },
        }),
    ]);

    console.log('Seed data created:');
    console.log('Users:', users);
    console.log('Hardware Components:', hardwareComponents);
    console.log('Images:', images);
    console.log('Setups:', setups);
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

