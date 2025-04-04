const { Sequelize } = require('sequelize');
const config = require('../../config/config.json')[process.env.NODE_ENV || 'development'];

let sequelize;
if (process.env.PG_URI) {
  // Se existir PG_URI no .env, use ela
  sequelize = new Sequelize(process.env.PG_URI, {
    dialect: 'postgres',
    logging: false,
  });
} else {
  // Caso contrário, use o config.json
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    logging: false,
  });
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL conectado');
    // Se quiser criar as tabelas automaticamente (sem migrações), descomente:
    // await sequelize.sync();
  } catch (error) {
    console.error('Erro ao conectar com PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
