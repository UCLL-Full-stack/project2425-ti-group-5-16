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

const createSetup = async ({
    ownerId,
    hardwareComponents: componentInput,
    imageUrls,
    details,
}: {
    ownerId: number;
    hardwareComponents: string[];
    imageUrls: string[];
    details: string;
}): Promise<Setup> => {
    try {
        // Validate and fetch the owner
        const owner = await database.user.findUnique({ where: { id: ownerId } });
        if (!owner) {
            throw new Error('Owner not found.');
        }

        // Validate and fetch the hardware components
        const hardwareComponents = await Promise.all(
            componentInput.map(async (componentName) => {
                const component = await database.hardwareComponent.findUnique({
                    where: { name : (componentName) },
                });
                if (!component) {
                    throw new Error(`Hardware component "${componentName}" not found.`);
                }
                return component;
            })
        );

        // Validate and fetch the images
        const images = await Promise.all(
            imageUrls.map(async (url) => {
                const image = await database.image.findUnique({
                    where: { url },
                });
                if (!image) {
                    throw new Error(`Image with URL "${url}" not found.`);
                }
                return image;
            })
        );

        // Create the setup
        const setupPrisma = await database.setup.create({
            data: {
                ownerId, // Direct reference to the owner
                details,
                hardwareComponents: {
                    create: hardwareComponents.map((component) => ({
                        hardwareComponentId: component.id,
                    })),
                },
                images: {
                    connect: images.map((image) => ({ id: image.id })), // Link to pre-existing images
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

        // Transform the Prisma result to the `Setup` model (if necessary)
        return Setup.from(setupPrisma); // Assuming `Setup.from` adapts Prisma's format to your domain model
    } catch (error) {
        console.error('Error creating setup:', error);
        throw new Error('Failed to create setup. See server log for details.');
    }
};


export default { getAllSetups, getSetupById, createSetup };