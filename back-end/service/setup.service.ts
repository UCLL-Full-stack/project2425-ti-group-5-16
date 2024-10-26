import { Setup } from '../model/setup';

import userdb from '../repository/user.db';
import hardware_components from '../repository/hardware_components.db';
import setupdb from '../repository/setup.db';

import { SetupInput } from '../types';
import hardware_componentsDb from '../repository/hardware_components.db';
import imagesDb from '../repository/images.db';

const getAllSetups = (): Setup[] => {
    return setupdb.getAllSetups();
};

const getSetupById = (setup_id: number): Setup => {
    return setupdb.getSetupById(setup_id);
};

const addSetup = ({ 
    setup_id,
    owner: ownerInput,
    hardware_components: componentInput, 
    image_urls, 
    details,
    last_updated  

}: SetupInput): Setup => {

    //BASIC VALIDATION
    if (!setup_id) {
        throw new Error("Setup ID is required");
    }
    if (setup_id in setupdb.getSetupById(setup_id)) {
        throw new Error("Setup ID already exists");
    }
    if (!ownerInput.id) {
        throw new Error("Owner ID is required");
    }

    // GET THE OWNER OBJECT USING THE ID
    const owner = userdb.getUserById({ id: ownerInput.id });
    if (!owner) {
        throw new Error("Owner not found");
    }

    // GET THE HARDWARE COMPONENTS OBJECTS USING THERE NAMES
    const hardware_components = componentInput.map((componentName) => {
        const component = hardware_componentsDb.getHardwareComponentByName({ name: componentName });
        if (!component) {
            throw new Error(`Hardware component ${componentName} not found`);
        }
        return component;
    });

    // GET THE IMAGE OBJECTS USING THEIR URLS RETURNS A LIST OF IMAGES
    const image_url_list = image_urls.map((url) => {
        const image = imagesDb.getImageByUrl({ url: url });
        if (!image) {
            throw new Error(`Image ${url} not found`);
        }
        return image;
    });

    const newSetup = new Setup ({ 
        setup_id, 
        owner, 
        hardware_components, 
        image_urls: image_url_list, 
        details, 
        last_updated 
    });

    console.log(newSetup);
    setupdb.addSetup(newSetup);

    return newSetup;
};

export default {addSetup, getAllSetups, getSetupById};