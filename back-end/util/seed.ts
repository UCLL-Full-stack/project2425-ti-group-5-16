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
                    ],
                },
                comments: {
                    create: [
                        {
                            content: 'Amazing setup! Love the RGB lighting!',
                            userId: users[1].id, // John comments on Linda's setup
                            createdAt: new Date('2023-01-15T10:00:00Z'),
                        },
                        {
                            content: 'Thanks! The RGB really adds to the atmosphere.',
                            userId: users[0].id, // Linda replies
                            createdAt: new Date('2023-01-15T11:30:00Z'),
                        },
                    ],
                },
            },
            include: {
                owner: true,
                hardwareComponents: {
                    include: {
                        hardwareComponent: true,
                    },
                },
                images: true,
                comments: {
                    include: {
                        user: true,
                    },
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
                    ],
                },
                comments: {
                    create: [
                        {
                            content: "How's the Ryzen 9 performing for your workload?",
                            userId: users[0].id, // Linda comments on John's setup
                            createdAt: new Date('2023-01-16T09:00:00Z'),
                        },
                        {
                            content: 'It handles everything I throw at it with ease!',
                            userId: users[1].id, // John replies
                            createdAt: new Date('2023-01-16T09:45:00Z'),
                        },
                        {
                            content: 'Great to hear! Might upgrade mine soon.',
                            userId: users[0].id, // Linda responds again
                            createdAt: new Date('2023-01-16T10:15:00Z'),
                        },
                    ],
                },
            },
            include: {
                owner: true,
                hardwareComponents: {
                    include: {
                        hardwareComponent: true,
                    },
                },
                images: true,
                comments: {
                    include: {
                        user: true,
                    },
                },
            },
        }),
    ]);

    // Create additional standalone comments (optional)
    const additionalComments = await Promise.all([
        prisma.comment.create({
            data: {
                content: 'The cable management looks really clean!',
                userId: users[1].id,
                setupId: setups[0].id,
                createdAt: new Date('2023-01-17T14:00:00Z'),
            },
            include: {
                user: true,
                setup: true,
            },
        }),
        prisma.comment.create({
            data: {
                content: 'What monitor arm are you using?',
                userId: users[0].id,
                setupId: setups[1].id,
                createdAt: new Date('2023-01-18T15:30:00Z'),
            },
            include: {
                user: true,
                setup: true,
            },
        }),
    ]);

    console.log('Seed data created:');
    console.log('Users:', users);
    console.log('Hardware Components:', hardwareComponents);
    console.log('Images:', images);
    console.log('Setups:', setups);
    console.log('Additional Comments:', additionalComments);
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
