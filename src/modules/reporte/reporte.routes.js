const express = require('express')
const router = express.Router()
const reporteController = require('./reporte.controller')
const upload = require('../../middleware/upload')

/**
 * @swagger
 * tags:
 *   name: Reporte
 *   description: Rotas de criação e visualização de reportes
 */

/**
 * @swagger
 * tags:
 *   name: Reporte
 *   description: Rotas de criação e visualização de reportes
 */

/**
 * @swagger
 * /api/reporte/create:
 *   post:
 *     tags:
 *       - Reporte
 *     summary: Criar um novo reporte
 *     description: Cria um novo reporte com uma descrição e uma imagem
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - descricaoReporte
 *               - imagemReporte
 *               - localizacaoReporte
 *             properties:
 *               descricaoReporte:
 *                 type: string
 *               localizacaoReporte:
 *                 type: string
 *               imagemReporte:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Reporte criado com sucesso
 *       400:
 *         description: Requisição inválida (dados obrigatórios ausentes)
 *       401:
 *         description: Token JWT ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */

router.post(
    '/create', 
    upload.fields([{ name: 'imagemReporte', maxCount: 1 }]), 
    reporteController.createReporte
);

module.exports = router;