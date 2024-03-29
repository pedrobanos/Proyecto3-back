const express = require("express");
const router = express.Router();
const upload = require('./storage.config');

const authMiddleware = require('../middlewares/auth.middleware')
const garagesController = require('../controllers/garages.controller')
const authController = require('../controllers/auth.controller')
const ORController = require('../controllers/OR.controllers')
const vehiclesController = require('../controllers/vehicles.controller')
const carOwnersController = require('../controllers/carOwners.controller')


router.get('/', (req, res, next) => {
  res.status(200).json({ ok: true })
})

/* Auth */

router.post('/login', authMiddleware.isNotAuthenticated, authController.login)

/* Garages */

router.post('/garages', authController.create)
router.get('/garages/me', authMiddleware.isAuthenticated, garagesController.getCurrentGarage)
router.get('/home', garagesController.getGarageById)

/* OR */
router.get('/ors',ORController.list)
router.post('/ors/new', upload.array('damageFotos[]', 4),ORController.create)
router.get('/ors/:id',ORController.detail)
router.patch('/ors/:id',ORController.update)
router.delete('/ors/:id',ORController.delete)

/* Vehicles */

router.get('/vehicles',vehiclesController.list)
router.post('/vehicles/new',vehiclesController.create)
router.get('/vehicles/:id',vehiclesController.detail)
router.put('/vehicles/:id',vehiclesController.update)
router.delete('/vehicles/:id',vehiclesController.delete)
router.post('/vehicles/search/:id',vehiclesController.search)

/* Car Owners */

router.get('/carowners',carOwnersController.list)
router.post('/carowners/new',carOwnersController.create)
router.get('/carowners/:id',carOwnersController.detail)
router.put('/carowners/:id',carOwnersController.update)
router.delete('/carowners/:id',carOwnersController.delete)
router.post('/carowners/search/:id',carOwnersController.search)





module.exports = router  