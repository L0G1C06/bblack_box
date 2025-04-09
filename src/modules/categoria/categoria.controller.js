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

exports.createCategoria = async (req, res) => {
    try{
        // Pegar o token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
          return res.status(401).json({ message: 'Token não fornecido' });
        }
    
        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
        const role = decoded.role;

        const categoriasReporte = req.body;
        // Verifica se o usuário é admin
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado. Somente administradores podem criar categorias.' });
        }
        const newCategoria = await Categoria.create(categoriasReporte);

        return res.status(201).json(newCategoria);

    } catch (error) {
        console.error('Erro ao cadastrar nova categoria: ', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}