const express = require('express');
const userController = require("../controller/userController");
const router = express.Router();

// User Routes
router.get('/', userController.getUsers);
router.get('/:id', userController.getByIdUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;