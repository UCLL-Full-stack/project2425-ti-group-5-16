import { Setup } from '../model/setup'
import { User } from '../model/user'
import { Hardware_Components } from '../model/hardware_components'
import { Images } from '../model/images'
import { mock } from 'node:test';

const mockuser1 = new User({
    id: 1,
    email: "janny-smith@gmail.com",
    password: "password1",
    name: "Janny Smith",
    age: 25
});

const mockuser2 = new User({
    id: 2,
    email: "richard-domer@gmail.com",
    password: "password2",
    name: "Richard Domer",
    age: 30
});

const hardware_componentA1 = new Hardware_Components({
    name: "AMD Ryzen 5 3600x",
    details: "6 cores, 12 threads, 3.8 GHz base clock, 4.4 GHz boost clock",
    price: 200
});

const hardware_componentA2 = new Hardware_Components({
    name: "NVIDIA GeForce RTX 3070",
    details: "8GB GDDR6, 5888 CUDA cores, 1.73 GHz boost clock",
    price: 500
});

const hardware_componentB1 = new Hardware_Components({
    name: "intel Core i9-10900k",
    details: "10 cores, 20 threads, 3.7 GHz base clock, 5.3 GHz boost clock",
    price: 400
});

const hardware_componentB2 = new Hardware_Components({
    name: "NVIDIA GeForce RTX 3080",
    details: "10GB GDDR6X, 8704 CUDA cores, 1.71 GHz boost clock",
    price: 700
});

const image1 = new Images({
    url: "htpps://www.example.com/image1",
});

const image2 = new Images({
    url: "htpps://www.example.com/image2",
});

const image3 = new Images({
    url: "htpps://www.example.com/image3",
});

const image4 = new Images({
    url: "htpps://www.example.com/image4",
});

const setupDB: Setup[] = [

    new Setup({ 
        setup_id: 1,
        owner: mockuser1,
        hardware_components: [hardware_componentA1, hardware_componentA2],
        image_urls: [image1, image2],
        details: "This is test setup 1 with AMD Ryzen 5 3600x and NVIDIA GeForce RTX 3070",
        last_updated: new Date("2023-01-01")
    }),

    new Setup({ 
        setup_id: 2,
        owner: mockuser2,
        hardware_components: [hardware_componentB1, hardware_componentB2],
        image_urls: [image3, image4],
        details: "This is a test setup with intel Core i9-10900k and NVIDIA GeForce RTX 3080",
        last_updated: new Date("2024-01-01")
    }),
];

const getAllSetups = (): Setup[] => {
    return setupDB;
}

const addSetup = (setup: Setup): void => {
    setupDB.push(setup);
}
