const app = require('./app');
const os = require('os');

const PORT = process.env.PORT || 3000;

// Função para buscar automaticamente o IP local da máquina
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

const IP = getLocalIP();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Servidor rodando com sucesso!`);
  console.log(`\n🌐 Local: http://localhost:${PORT}`);
  console.log(`📶 Rede:  http://${IP}:${PORT}\n`);
});