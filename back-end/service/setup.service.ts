import { set } from 'date-fns';
import setupdb from '../repository/setup.db';
import { Setup } from '../repository/setup.db';
import { SetupInput } from '../types';

const createSetup = ({ 
    setupid, 
    owner, 
    hardware_components, 
    image_urls, 
    details, 
    last_updated 

}: SetupInput): SetupInput => {

    const newSetup = new Setup ({ setupid, owner, hardware_components, image_urls, details, last_updated });
    setupdb.push(newSetup);

    return newSetup;
};