const jwt = require('jsonwebtoken');

const { Categoria } = require('../../models');

const secretKey = process.env.JWT_SECRET || 'sua_chave_secreta';

exports.listCategorias = async (req, res) => {
    try {
        // Pegar o token do cabeçalho da requisição
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
              return res.status(401).json({ message: 'Token não fornecido' });
            }
        
            // Verificar e decodificar o token
            jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
            
            const categorias = await Categoria.findAll();

            return res.status(200).json({
                data: categorias
            });

    } catch (error) {
        console.error('Erro ao listar categorias: ', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}