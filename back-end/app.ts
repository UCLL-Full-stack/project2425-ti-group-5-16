import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

// BASIC CONFIGURATION
const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./controller/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});

// USER ROUTES
import { userRouter } from './controller/user.routes';
app.use('/users', userRouter);

// HARDWARE COMPONENTS ROUTES
import { hardwareComponentsRouter } from './controller/hardwareComponent.router';
app.use('/hardwareComponents', hardwareComponentsRouter);

// IMAGES ROUTES
import { imagesRouter } from './controller/images.router';
app.use('/images', imagesRouter);

/*
// SETUP ROUTES
import { setupRouter } from './controller/setup.router';
app.use('/setup', setupRouter);

// COMMENT ROUTES
import { commentRouter } from './controller/comment.router';
app.use('/comments', commentRouter);
*/
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});
