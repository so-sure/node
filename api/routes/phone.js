const express = require('express')
const router = express.Router()

const phoneParam = require('../params/phone')

const getPhones = require('../handlers/getPhones')
const getPhone = require('../handlers/getPhone')
const deletePhone = require('../handlers/deletePhone')
const updatePhone = require('../handlers/updatePhone')

router.param('phone', phoneParam)
router.get('/', getPhones)
router.get('/:phone', getPhone)
router.patch('/:phone', updatePhone)
router.delete('/:phone', deletePhone)

module.exports = router
