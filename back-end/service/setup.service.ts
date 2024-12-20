import bcrypt from 'bcrypt';
import setupDB from '../repository/setup.db';
import userDB from '../repository/user.db';
import { Setup } from '../model/setup';
import { User } from '../model/user';
import { HardwareComponent } from '../model/hardwareComponent';
import { Image } from '../model/image';
import { SetupInput, SetupUpdateData } from '../types';
import { Comment } from '../model/comment';
import hardwareComponentDB from '../repository/hardwareComponent.db';
import imageDB from '../repository/images.db';
import database from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

// In setup.service.ts
const createSetup = async (setupData: {
    ownerId: number;
    details: string;
    hardwareComponentIds?: number[];
    imageIds?: number[];
}): Promise<Setup> => {
    const owner = await userDB.getUserById({ id: setupData.ownerId });
    if (!owner) {
        throw new Error(`User with id: ${setupData.ownerId} does not exist.`);
    }

    // Fetch hardware components if IDs are provided
    let hardwareComponents: HardwareComponent[] = [];
    if (setupData.hardwareComponentIds && setupData.hardwareComponentIds.length > 0) {
        hardwareComponents = await Promise.all(
            setupData.hardwareComponentIds.map(async (id) => {
                const component = await hardwareComponentDB.getById({ id });
                if (!component) {
                    throw new Error(`Hardware component with id: ${id} does not exist.`);
                }
                return component;
            })
        );
    }

    // Fetch images if IDs are provided
    let images: Image[] = [];
    if (setupData.imageIds && setupData.imageIds.length > 0) {
        images = await Promise.all(
            setupData.imageIds.map(async (id) => {
                const image = await imageDB.getById({ id });
                if (!image) {
                    throw new Error(`Image with id: ${id} does not exist.`);
                }
                return image;
            })
        );
    }

    const setup = new Setup({
        ownerId: setupData.ownerId,
        owner,
        details: setupData.details,
        lastUpdated: new Date(),
        hardwareComponents,
        images,
        comments: [],
    });

    const createdSetup = await setupDB.createSetup(setup);

    // Connect hardware components and images
    if (setupData.hardwareComponentIds && setupData.hardwareComponentIds.length > 0) {
        for (const componentId of setupData.hardwareComponentIds) {
            await setupDB.addHardwareComponent({
                setupId: createdSetup.getId(),
                componentId,
            });
        }
    }

    if (setupData.imageIds && setupData.imageIds.length > 0) {
        for (const imageId of setupData.imageIds) {
            await setupDB.addImage({
                setupId: createdSetup.getId(),
                imageId,
            });
        }
    }

    // Fetch the updated setup with all relations
    return (await setupDB.getSetupById({ id: createdSetup.getId() })) as Setup;
};

const updateSetup = async (
    id: number,
    setupData: {
        details?: string;
        hardwareComponentIds?: number[];
        imageIds?: number[];
    }
): Promise<Setup> => {
    // Check if setup exists
    const existingSetup = await setupDB.getSetupById({ id });
    if (!existingSetup) {
        throw new Error(`Setup with id: ${id} does not exist.`);
    }

    // Fetch hardware components if IDs are provided
    let hardwareComponents: HardwareComponent[] = [];
    if (setupData.hardwareComponentIds && setupData.hardwareComponentIds.length > 0) {
        hardwareComponents = await Promise.all(
            setupData.hardwareComponentIds.map(async (id) => {
                const component = await hardwareComponentDB.getById({ id });
                if (!component) {
                    throw new Error(`Hardware component with id: ${id} does not exist.`);
                }
                return component;
            })
        );
    }

    // Fetch images if IDs are provided
    let images: Image[] = [];
    if (setupData.imageIds && setupData.imageIds.length > 0) {
        images = await Promise.all(
            setupData.imageIds.map(async (id) => {
                const image = await imageDB.getById({ id });
                if (!image) {
                    throw new Error(`Image with id: ${id} does not exist.`);
                }
                return image;
            })
        );
    }

    const setup = new Setup({
        id,
        ownerId: existingSetup.getOwnerId(),
        owner: existingSetup.getOwner(),
        details: setupData.details || existingSetup.getDetails(),
        lastUpdated: new Date(),
        hardwareComponents,
        images,
        comments: existingSetup.getComments(),
    });

    // First remove all existing components and images
    const existingComponents = existingSetup.getHardwareComponents();
    for (const component of existingComponents) {
        const componentId = component.getId();
        if (componentId === undefined) {
            throw new Error(`Component ID is undefined for component: ${component}`);
        }
        await setupDB.removeHardwareComponent({
            setupId: id,
            componentId,
        });
    }

    const existingImages = existingSetup.getImages();
    for (const image of existingImages) {
        const imageId = image.getId();
        if (imageId === undefined) {
            throw new Error(`Image ID is undefined for image: ${image}`);
        }
        await setupDB.removeImage({
            setupId: id,
            imageId,
        });
    }

    // Update the basic setup details
    const updatedSetup = await setupDB.updateSetup(id, {
        details: setupData.details,
        hardwareComponentIds: setupData.hardwareComponentIds,
        imageIds: setupData.imageIds,
    });

    // Connect new hardware components and images
    if (setupData.hardwareComponentIds && setupData.hardwareComponentIds.length > 0) {
        for (const componentId of setupData.hardwareComponentIds) {
            await setupDB.addHardwareComponent({
                setupId: id,
                componentId,
            });
        }
    }

    if (setupData.imageIds && setupData.imageIds.length > 0) {
        for (const imageId of setupData.imageIds) {
            await setupDB.addImage({
                setupId: id,
                imageId,
            });
        }
    }

    // Fetch and return the final updated setup with all relations
    return (await setupDB.getSetupById({ id })) as Setup;
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
