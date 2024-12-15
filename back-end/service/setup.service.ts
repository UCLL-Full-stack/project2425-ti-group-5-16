import setupDB from '../repository/setup.db';
import { Setup } from '../model/setup';
import { Setup as SetupPrisma } from '@prisma/client';

const getAllSetups = async (): Promise<Setup[]> => {
    const setups = await setupDB.getAllSetups();
    return setups;
};

const getSetupById = async (id: number): Promise<Setup | null> => {
    // Changed return type to Setup
    const setup = await setupDB.getSetupById(id);
    return setup;
};

export default { getAllSetups, getSetupById };
