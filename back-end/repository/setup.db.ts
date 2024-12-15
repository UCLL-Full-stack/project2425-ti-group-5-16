/*import { Setup } from '../model/setup';
import database from './database';

const getSetupById = async ({ id }: { id: number }): Promise<Setup | null> => {
    try {
        const setupPrisma = await database.setup.findUnique({
            where: { id },
        });

        return setupPrisma ? Setup.from(setupPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllSetups = async (): Promise<Setup[]> => {
    try {
        const setupsPrisma = await database.setup.findMany();
        return setupsPrisma.map((setupPrisma) => Setup.from(setupPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createSetup = async (setup: Setup): Promise<Setup> => {
    try {
        const setupPrisma = await database.setup.create({
            data: {
                owner: setup.getOwner(),
                hardware_components: setup.getHardwareComponents(),
                image_urls: setup.getImageUrls(),
                details: setup.getDetails(),
                last_updated: setup.getLastUpdated(),
            },
        });
        return Setup.from(setupPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteSetup = async (id: number): Promise<Setup> => {
    try {
        const setupPrisma = await database.setup.delete({
            where: { id },
        });
        return Setup.from(setupPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllSetups, getSetupById, createSetup, deleteSetup };
*/
