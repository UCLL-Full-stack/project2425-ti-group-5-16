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
    setup_id,
    owner: ownerInput,
    hardware_components: componentInput,
    image_urls,
    details,
    last_updated,
}: SetupInput): Promise<Setup> => {
    // BASIC VALIDATION
    if (!setup_id) {
        throw new Error('Setup ID is required');
    }
    if (setupdb.getSetupById(setup_id)) { // Fix incorrect use of 'in'
        throw new Error('Setup ID already exists');
    }
    if (!ownerInput || !ownerInput.id) {
        throw new Error('Owner ID is required');
    }

    // GET THE OWNER OBJECT USING THE ID
    const owner = await userdb.getUserById({ id: ownerInput.id }); // Pass an object with id
    if (!owner) {
        throw new Error('Owner not found');
    }

    // GET THE HARDWARE COMPONENTS OBJECTS USING THEIR NAMES
    const hardware_components = componentInput.map((componentName) => {
        const component = hardware_componentsDb.getHardwareComponentByName({ name: componentName }); // Fix destructuring
        if (!component) {
            throw new Error(`Hardware component "${componentName}" not found`);
        }
        return component;
    });

    // GET THE IMAGE OBJECTS USING THEIR URLS
    const image_url_list = image_urls.map((url) => {
        const image = imagesDb.getImageByUrl({ url }); // Fix destructuring
        if (!image) {
            throw new Error(`Image with URL "${url}" not found`);
        }
        return image;
    });

    const newSetup = new Setup({
        setup_id,
        owner, // full owner object
        hardware_components, // full hardware components objects
        image_urls: image_url_list, // full image objects
        details,
        last_updated,
    });

    console.log('New Setup:', newSetup);
    setupdb.addSetup(newSetup);

    return newSetup;
};


export default { addSetup, getAllSetups, getSetupById };
