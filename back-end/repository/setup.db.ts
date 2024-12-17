import { Setup } from '../model/setup';
import database from './database';

const getAllSetups = async (): Promise<Setup[]> => {
    try {
        const setupsPrisma = await database.setup.findMany({
            include: {
                owner: true,
                hardwareComponents: {
                    include: {
                        hardwareComponent: true,
                    },
                },
                images: true,
                comments: true,
            },
        });
        return setupsPrisma.map((setupPrisma) => Setup.from(setupPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getSetupById = async (id: number): Promise<Setup | null> => {
    try {
        const setupPrisma = await database.setup.findUnique({
            where: { id },
            include: {
                owner: true,
                hardwareComponents: {
                    include: {
                        hardwareComponent: true,
                    },
                },
                images: true,
                comments: true,
            },
        });
        return setupPrisma ? Setup.from(setupPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createSetup = async (setup: Setup): Promise<Setup> => {
    try {
        // Create the setup with related data
        const setupPrisma = await database.setup.create({
            data: {
                ownerId: setup.ownerId, // Assuming `ownerId` is passed in the setup object
                details: setup.details,
                hardwareComponents: {
                    create: setup.hardwareComponents.map((hc) => ({
                        hardwareComponent: {
                            connect: { id: hc.id },
                        },
                    })),
                },
                images: {
                    connect: setup.images.map((image) => ({
                        id: image.id, // Images must exist; we're connecting them here
                    })),
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
            },
        });

        return Setup.from(setupPrisma); // Convert Prisma object to domain model
    } catch (error) {
        console.error('Error creating setup:', error);
        throw new Error('Failed to create setup. See server log for details.');
    }
};

export default { getAllSetups, getSetupById, createSetup };