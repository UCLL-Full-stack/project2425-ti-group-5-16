import { Hardware_Components } from '../model/hardware_components';

const hardware_componentsDB: Hardware_Components[] = [
    new Hardware_Components({
        name: "AMD Ryzen 5 3600x",
        details: "6 cores, 12 threads, 3.8 GHz base clock, 4.4 GHz boost clock",
        price: 250
    }),

    new Hardware_Components({
        name: "NVIDIA GeForce RTX 3070",
        details: "8GB GDDR6, 5888 CUDA cores, 1.73 GHz boost clock",
        price: 500
    }),

    new Hardware_Components({
        name: "Intel Core i9-10900k",
        details: "10 cores, 20 threads, 3.7 GHz base clock, 5.3 GHz boost clock",
        price: 500
    }),

    new Hardware_Components({
        name: "NVIDIA GeForce RTX 3080",
        details: "10GB GDDR6X, 8704 CUDA cores, 1.71 GHz boost clock",
        price: 700
    }),
];

const getAllHardwareComponents = (): Hardware_Components[] => { 
    return hardware_componentsDB;
}

const getHardwareComponentByName = ({ name }: { name: string }): Hardware_Components | null => {
    return hardware_componentsDB.find((component) => component.getName() === name) || null;
}

export default {getAllHardwareComponents, getHardwareComponentByName};
