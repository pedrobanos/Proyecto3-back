const express = require("express");
const router = express.Router();

const garagesController = require('../controllers/garages.controller')
const authController = require('../controllers/auth.controller')


router.get('/', (req, res, next) => {
  console.log('hola');
  res.status(200).json({ ok: true })
})

/* Garages */

router.post('/garages', authController.create)
router.get('/garages/:id', garagesController.getGarageById)


module.exports = router  