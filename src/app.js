const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { connectDB } = require('./config/db');

require('./config/env');
connectDB();

const app = express();

// Middlewares (CORS configurado corretamente)
app.use(cors({
  origin: '*',
}));

app.use(express.json());

// Rotas existentes
const baseRoute = require('./modules/health/health.routes');
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');
const reporteRoutes = require('./modules/reporte/reporte.routes');
const categoriaRoutes = require('./modules/categoria/categoria.routes');

app.use('/', baseRoute);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reporte', reporteRoutes);
app.use('/api/categoria', categoriaRoutes);
// Documentação Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
