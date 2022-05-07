const Vehicle = require('../models/Vehicle.model')
const createError = require('http-errors')
// const makes = Object.keys(require('../vehicleData/makes.json'))
// const models = Object.keys(require('../vehicleData/models.json'))


module.exports.list = (req, res, next) => {
    const { plate } = req.query

    const query = {}

    if (plate) {
        query.plate = plate
    }

    Vehicle.find(query)
        .populate('carOwner')
        .then(vehicles => {
            if (!vehicles) {
                res.status(200).json([])
            } else {
                res.status(200).json(vehicles)
            }
        })
        .catch(next)
}

module.exports.create = (req, res, next) => {
    const vehicle = req.body
    Vehicle.findOne({ plate: req.body.plate })
        .then((bbddVehicle) => {
            if (bbddVehicle) {
                next(createError(404, { errors: { plate: 'Plate has been already registered' } }))
            } else {
                return Vehicle.create(vehicle)
                    .then(vehicle => res.status(200).json(vehicle))
                }
            })
        .catch(next)
}


module.exports.detail = (req, res, next) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => res.status(200).json(vehicle))
        .catch(next)
}

module.exports.update = (req, res, next) => {
    console.log(req.params.id)
    Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(vehicle => {
            console.log(or, req.body)
            res.status(200).json(vehicle)
        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Vehicle.findByIdAndDelete(req.params.id)
        .then(vehicle => res.status(202).json(vehicle))
        .catch(next)
}

module.exports.search = (req, res, next) => {
    Vehicle.findOne({ plate: req.params.id })
    .then(vehicle => res.status(200).json(vehicle))
    .catch(next)
}