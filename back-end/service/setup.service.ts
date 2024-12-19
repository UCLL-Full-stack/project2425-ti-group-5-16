import setupDB from '../repository/setup.db';
import { Setup } from '../model/setup';
import { Setup as SetupPrisma } from '@prisma/client';
import { SetupInput } from '../types';
import { User } from '../model/user';
import { HardwareComponent } from '../model/hardwareComponent';
import { Image } from '../model/image';

const getAllSetups = async (): Promise<Setup[]> => {
    const setups = await setupDB.getAllSetups();
    return setups;
};

const getSetupById = async (id: number): Promise<Setup | null> => {
    // Changed return type to Setup
    const setup = await setupDB.getSetupById({ id });
    return setup;
};

const getSetupByEmail = async ({ email }: { email: string }): Promise<Setup[]> => {
    const setups = await setupDB.getSetupByEmail({ email });
    return setups;
};

/*
const createSetup = async ({owner,hardwareComponents = [],images = [],details}: SetupInput): Promise<Setup> => {
    // Changed return type to Setup
    const ownerId = owner.id;
    if (hardwareComponents.length === 0) {
        hardwareComponents = [];

    }
    const setup = new Setup({
        user: owner,
        ownerId,
        hardwareComponents,
        images: images.length > 0 ? images : [],
        details
    });
    return await setupDB.createSetup(setup);
};
*/
const createSetup = async (setupInput: SetupInput): Promise<Setup> => {
    const owner = new User(setupInput.owner); // Ensure the owner is a User instance
    const setup = new Setup({
        ownerId: owner.getId()!,
        owner,
        hardwareComponents: setupInput.hardwareComponents || [],
        Images: setupInput.images || [],
        details: setupInput.details,
        lastUpdated: new Date(),
        comments: [],
    });
    return await setupDB.createSetup(setup);
};

export default { getAllSetups, getSetupById, getSetupByEmail, createSetup };
