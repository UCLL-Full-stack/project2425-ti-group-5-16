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

const getSetupById = async ({ id }: { id: number }): Promise<Setup | null> => {
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
};

const getSetupByEmail = async ({ email }: { email: string }): Promise<Setup[]> => {
    try {
        const setupsPrisma = await database.setup.findMany({
            where: { owner: { email } },
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

/*
const createSetup = async (setup: Setup): Promise<Setup> => {
    try {
        const setupPrisma = await database.setup.create({
            data: {
                ownerId: setup.getOwnerId(),
                hardwareComponents: setup.getHardwareComponents(),
                imageUrls: setup.getImageUrls(),
                details: setup.getDetails(),
                lastUpdated: setup.getLastUpdated(),
            },
        });
        return Setup.from(setupPrisma);
    } catch (error) {
        console.error('Error creating setup:', error);
        throw new Error('Failed to create setup. See server log for details.');
    }
};
*/

export default { getAllSetups, getSetupById, getSetupByEmail /*createSetup*/ };