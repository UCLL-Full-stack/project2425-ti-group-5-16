import { Setup } from '../model/setup';

import userdb from '../repository/user.db';
import hardware_components from '../repository/hardware_components.db';
import setupdb from '../repository/setup.db';

import { SetupInput } from '../types';
import hardware_componentsDb from '../repository/hardware_components.db';

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
    image_urls: imageInput, 
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

    // GET THE IMAGE URL OBJECTS USING THERE URLS
    

    const newSetup = new Setup ({ setup_id, owner, hardware_components: [], image_urls: [], details, last_updated });

    console.log(newSetup);
    setupdb.addSetup(newSetup);

    return newSetup;
};

export default {addSetup, getAllSetups, getSetupById};