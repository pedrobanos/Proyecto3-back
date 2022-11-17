const createError = require('http-errors')
const Garage = require('../models/Garage.model')

module.exports.getGarageById = (req, res, next) => {
  Garage.findById(req.params.id)
    .then(garage => {
      if (!garage) {
        // not found
        next(createError(404, 'Garage not found'))
      } else {
        res.status(200).json(garage)
      }
    })
    .catch(next)
}
module.exports.getCurrentGarage = (req, res, next) => {
  Garage.findById(req.currentGarage)
    // .populate({
    //   path: 'or',
    //   populate: {
    //     path: 'vehicle',
    //     populate: {
    //       path: 'carOwner'
    //     }
    //   }
    // })
    .then(garage => {
      if (!garage) {
        // not found
        next(createError(404, 'Garage not found'))
      } else {
        res.status(200).json(garage)
      }
    })
    .catch(next)
}