const express = require('express')
const router = express.Router()
const categoriaController = require('./categoria.controller')

/**
 * @swagger
 * tags:
 *   name: Categoria
 *   description: Rotas de criação e visualização de categorias
 */

/**
 * @swagger
 * /api/categoria/create:
 *   post:
 *     tags:
 *       - Categoria
 *     summary: Cria uma nova categoria
 *     description: Cria uma nova categoria de reporte, apenas se o usuário for admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoriasReporte
 *             properties:
 *               categoriasReporte:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       403:
 *         description: Usuário não é admin
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/create', categoriaController.createCategoria);

/**
 * @swagger
 * /api/categoria/get:
 *   get:
 *     tags:
 *       - Categoria
 *     summary: Retorna categorias
 *     description: Retorna todos as categorias de reporte disponíveis
 *     responses:
 *       200:
 *         description: Categorias disponíveis
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/get', categoriaController.listCategorias);

module.exports = router;