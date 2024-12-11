import { Setup } from '../model/setup';
import userdb from '../repository/user.db';
import hardware_componentsDb from '../repository/hardware_components.db';
import imagesDb from '../repository/images.db';
import setupdb from '../repository/setup.db';

import { SetupInput } from '../types';

const getAllSetups = (): Setup[] => {
    return setupdb.getAllSetups();
};

const getSetupById = (setup_id: number): Setup => {
    return setupdb.getSetupById(setup_id);
};

const addSetup = async ({
    //setup.id (generated)
    owner: ownerInput, // Logged-in user ID is given when creating a setup
    hardware_components: componentInput,
    image_urls,
    details,
    last_updated,

}: SetupInput): Promise<Setup> => {

    // Generate a unique not yet existing ID for the new setup
    const setup_id = setupdb.generateUniqueSetupId();

    if (!ownerInput || !ownerInput.id) {
        throw new Error('No user ID was given when creating setup');
    }

    // Get the owner object using the ID
    const owner = await userdb.getUserById({ id: ownerInput.id });
    if (!owner) {
        throw new Error('Owner not found');
    }

    // Get the hardware components objects using their names
    const hardware_components = componentInput.map((componentName) => {
        const component = hardware_componentsDb.getHardwareComponentByName({ name: componentName });
        if (!component) {
            throw new Error(`Hardware component "${componentName}" not found`);
        }
        return component;
    });

    // Get the image objects using their URLs
    const image_url_list = image_urls.map((url) => {
        const image = imagesDb.getImageByUrl({ url });
        if (!image) {
            throw new Error(`Image with URL "${url}" not found`);
        }
        return image;
    });

    const newSetup = new Setup({
        setup_id, // generated setup_id
        owner, // Full owner object
        hardware_components, // Full hardware components objects
        image_urls: image_url_list, // Full image objects
        details,
        last_updated,
    });

    setupdb.addSetup(newSetup);

    return newSetup;
};

export default { addSetup, getAllSetups, getSetupById };

