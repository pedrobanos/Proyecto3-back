const express = require("express");
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware')

const garagesController = require('../controllers/garages.controller')
const authController = require('../controllers/auth.controller')


router.get('/', (req, res, next) => {
  console.log('hola');
  res.status(200).json({ ok: true })
})

/* Auth */

router.post('/login', authController.login)

/* Garages */

router.post('/garages', authController.create)
router.get('/garages/me', authMiddleware.isAuthenticated, garagesController.getCurrentGarage)
router.get('/garages/:id', garagesController.getGarageById)


module.exports = router  