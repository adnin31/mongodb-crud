const express = require('express')
const router = express.Router()
const library = require('../controller/books')


router.post('/',library.insertBook)
router.put('/:id',library.updateBook)
router.delete('/:id',library.deleteBook)
router.get('/',library.viewBook)

module.exports = router;
