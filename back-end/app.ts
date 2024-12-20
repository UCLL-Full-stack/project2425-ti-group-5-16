import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import { resolve } from 'path';

// BASIC CONFIGURATION
const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(helmet());

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Setup API',
            version: '1.0.0',
            description: 'Setup management API documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [resolve(__dirname, './controller/*.ts'), resolve(__dirname, './controller/*.js')], // Include both TS and JS files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const corsOptions = {
    origin: true,
    credentials: true,
};

// Configure Swagger UI
app.use(
    '/api-docs',
    cors(corsOptions),
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCssUrl:
            'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css',
        customSiteTitle: 'Setup API Documentation',
        swaggerOptions: {
            persistAuthorization: true,
        },
    })
);

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
import { hardwareComponentsRouter } from './controller/hardwareComponent.router';
app.use('/hardwareComponents', hardwareComponentsRouter);

// IMAGES ROUTES
import { imagesRouter } from './controller/images.router';
app.use('/images', imagesRouter);

// SETUP ROUTES
import { setupRouter } from './controller/setup.router';
app.use('/setup', setupRouter);

// COMMENT ROUTES
import { commentRouter } from './controller/comment.router';
app.use('/comments', commentRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'CoursesError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});
