const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.getProfile = async (req, res) => {
  try {
    // Pegar o token do cabeçalho da requisição
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
    const userId = decoded.id; // Pegamos o ID do usuário a partir do token

    // Buscar o usuário no banco de dados
    const user = await User.findByPk(userId, {
      attributes: ['id', 'nome', 'email', 'role', 'birthdate', 'cpf', 'cep', 'address', 'bairro', 'localidade', 'uf']
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil do usuário', details: error.message });
  }
};
