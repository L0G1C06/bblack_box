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
const authRoutes = require('./modules/auth/auth.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const userRoutes = require('./modules/user/user.routes');
const incidentRoutes = require('./modules/incident/incident.routes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/incidents', incidentRoutes);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
