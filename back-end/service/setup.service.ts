import { User } from '../model/user';
import { Setup } from '../model/setup';

import userdb from '../repository/user.db';
import setupdb from '../repository/setup.db';
import { SetupInput } from '../types';

const getAllSetups = (): Setup[] => {
    return setupdb.getAllSetups();
};

const getSetupById = (setup_id: number): Setup => {
    return setupdb.getSetupById(setup_id);
};

const addSetup = ({ 
    setup_id,
    owner: ownerInput,
    hardware_components: [], 
    image_urls: [], 
    details,
    last_updated  

}: SetupInput): Setup => {

    if (!setup_id) {
        throw new Error("Setup ID is required");
    }
    if (setup_id in setupdb.getSetupById(setup_id)) {
        throw new Error("Setup ID already exists");
    }
    if (!ownerInput.id) {
        throw new Error("Owner ID is required");
    }

    const owner = userdb.getUserbyId(ownerInput.id);

    const newSetup = new Setup ({ setup_id, owner, hardware_components: [], image_urls: [], details, last_updated });

    console.log(newSetup);
    setupdb.addSetup(newSetup);

    return newSetup;
};

export default {addSetup, getAllSetups, getSetupById};