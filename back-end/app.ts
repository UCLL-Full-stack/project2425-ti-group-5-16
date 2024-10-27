import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

// BASIC CONFIGURATION
const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

// USER ROUTES

import { userRouter } from './controller/user.routes';
app.use('/users', userRouter);

// HARDWARE COMPONENTS ROUTES

import { hardwareComponentsRouter } from './controller/hardware_components.router';
app.use('/hardware-components', hardwareComponentsRouter);

// IMAGES ROUTES    

import { imagesRouter } from './controller/images.router';
app.use('/images', imagesRouter);

// SETUP ROUTES

import { setupRouter } from './controller/setup.router';
app.use('/setup', setupRouter);

