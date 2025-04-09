const { Reporte } = require('../../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

exports.createReporte = async (req, res) =>{
    try {
        // Pegar token do cabeçalho da requisição
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        // Verificar e decodificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
        const nomePerfil = decoded.nome;

        const { descricaoReporte } = req.body;

        if (!descricaoReporte || !req.files || !req.files.imagemReporte || !req.files.imagemReporte.length) {
            return res.status(400).json({ message: 'Descrição e imagem do reporte são obrigatórios' });
        }

        // Pegar imagem do reporte enviada
        const imagemReporte = req.files.imagemReporte[0].path;

        // Sorteia uma imagem da pasta 'static/fotosPerfil/'
        //const fotosPerfilDir = path.join(__dirname, '..', '..', 'static', 'fotosPerfil');
        //const fotos = fs.readdirSync(fotosPerfilDir);
        //const fotosSorted = fotos[Math.floor(Math.random() * fotos.length)];
        //const fotosPerfil = path.join(fotosPerfilDir, fotosSorted);
        const fotoPerfil = "Imagem simulada";

        const horarioReporte = new Date();
        const localizacaoReporte = 'Localizacao simulada';
        const avaliacaoReporte = null;

        const novoReporte = await Reporte.create({
            fotoPerfil,
            nomePerfil,
            horarioReporte,
            localizacaoReporte,
            descricaoReporte,
            imagemReporte,
            avaliacaoReporte
        });

        return res.status(201).json({
            message: 'Reporte criado com sucesso',
            data: novoReporte
        });
    } catch (error) {
        console.error('Erro ao criar reporte: ', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
}