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