const express = require('express');
const { query, getById, add, update, remove } = require('./person.controller');
const router = express.Router();

router.get('/', query);
router.get('/:id', getById);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;