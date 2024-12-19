import bcrypt from 'bcrypt';
import setupDB from '../repository/setup.db';
import userDB from '../repository/user.db';
import { Setup } from '../model/setup';

const getAllSetups = async (): Promise<Setup[]> => setupDB.getAllSetups();

const getSetupById = async ({ id }: { id: number }): Promise<Setup> => {
    const setup = await setupDB.getSetupById({ id });
    if (!setup) {
        throw new Error(`Setup with id: ${id} does not exist.`);
    }
    return setup;
};

const getSetupsByOwnerId = async ({ ownerId }: { ownerId: number }): Promise<Setup[]> => {
    const setups = await setupDB.getSetupsByOwnerId({ ownerId });
    if (!setups) {
        throw new Error(`No setups found for owner with id: ${ownerId}`);
    }
    return setups;
};

const createSetup = async (setupData: {
    ownerId: number;
    details: string;
    hardwareComponents?: number[];
    images?: number[];
}): Promise<Setup> => {
    const owner = await userDB.getUserById({ id: setupData.ownerId });
    if (!owner) {
        throw new Error(`User with id: ${setupData.ownerId} does not exist.`);
    }

    const setup = new Setup({
        ownerId: setupData.ownerId,
        owner,
        details: setupData.details,
        lastUpdated: new Date(),
        hardwareComponents: [],
        images: [],
        comments: [],
    });

    return await setupDB.createSetup(setup);
};

const updateSetup = async (
    id: number,
    setupData: {
        details?: string;
        hardwareComponents?: number[];
        images?: number[];
    }
): Promise<Setup> => {
    const existingSetup = await setupDB.getSetupById({ id });
    if (!existingSetup) {
        throw new Error(`Setup with id: ${id} does not exist.`);
    }

    if (setupData.details) {
        existingSetup.setDetails(setupData.details);
    }

    return await setupDB.updateSetup(existingSetup);
};

const deleteSetup = async ({ id }: { id: number }): Promise<void> => {
    const existingSetup = await setupDB.getSetupById({ id });
    if (!existingSetup) {
        throw new Error(`Setup with id: ${id} does not exist.`);
    }

    await setupDB.deleteSetup({ id });
};

const addHardwareComponent = async ({
    setupId,
    componentId,
}: {
    setupId: number;
    componentId: number;
}): Promise<Setup> => {
    const setup = await setupDB.getSetupById({ id: setupId });
    if (!setup) {
        throw new Error(`Setup with id: ${setupId} does not exist.`);
    }

    return await setupDB.addHardwareComponent({ setupId, componentId });
};

const removeHardwareComponent = async ({
    setupId,
    componentId,
}: {
    setupId: number;
    componentId: number;
}): Promise<Setup> => {
    const setup = await setupDB.getSetupById({ id: setupId });
    if (!setup) {
        throw new Error(`Setup with id: ${setupId} does not exist.`);
    }

    return await setupDB.removeHardwareComponent({ setupId, componentId });
};

const addImage = async ({
    setupId,
    imageId,
}: {
    setupId: number;
    imageId: number;
}): Promise<Setup> => {
    const setup = await setupDB.getSetupById({ id: setupId });
    if (!setup) {
        throw new Error(`Setup with id: ${setupId} does not exist.`);
    }

    return await setupDB.addImage({ setupId, imageId });
};

const removeImage = async ({
    setupId,
    imageId,
}: {
    setupId: number;
    imageId: number;
}): Promise<Setup> => {
    const setup = await setupDB.getSetupById({ id: setupId });
    if (!setup) {
        throw new Error(`Setup with id: ${setupId} does not exist.`);
    }

    return await setupDB.removeImage({ setupId, imageId });
};

export default {
    getAllSetups,
    getSetupById,
    getSetupsByOwnerId,
    createSetup,
    updateSetup,
    deleteSetup,
    addHardwareComponent,
    removeHardwareComponent,
    addImage,
    removeImage,
};
