import express from 'express';
import { connectDB } from './infrastructure/database/mongoose';
import { UserService } from './application/services/userService';
import { MongooseUserRepository } from './infrastructure/database/mongooseUserRepository';
import userRoutes from './infrastructure/routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './infrastructure/config/swaggerConfig';

const app = express();

app.use(express.json());

// Conectar a la base de datos
connectDB();

// Configurar inyección de dependencias
const userRepository = new MongooseUserRepository();
const userService = new UserService(userRepository);

// Rutas de usuario
app.use('/api', userRoutes(userService));

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
