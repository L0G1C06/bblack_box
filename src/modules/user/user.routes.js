const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Perfil do usuário
 *     description: Retorna as informações do perfil do usuário.
 *     responses:
 *       200:
 *         description: Dados do perfil do usuário.
 */
router.get('/profile', userController.getProfile);

module.exports = router;
