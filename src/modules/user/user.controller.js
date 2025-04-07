const { User } = require('../../models');
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

exports.updateProfile = async (req, res) => {
  try {
    // Pegar o token do cabeçalho da requisição
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
    const userId = decoded.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Lista de campos que podem ser atualizados
    const allowedFields = ['nome', 'email', 'role', 'birthdate', 'cep', 'address', 'bairro', 'localidade', 'uf'];

    const updates = {};

    // Preencher somente os campos válidos e não vazios
    for (const field of allowedFields) {
      if (req.body[field] !== undefined && req.body[field] !== '' && req.body[field] != "string") {
        updates[field] = req.body[field];
      }
    }

    // Atualiza os campos permitidos
    await user.update(updates);

    res.json({ message: 'Perfil atualizado com sucesso', user });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o perfil do usuário', details: error.message });
  }
};