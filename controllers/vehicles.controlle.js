const Vehicle = require('../models/Vehicle.model')


module.exports.list = (req, res, next) => {
    Vehicle.find()
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
    Vehicle.create(vehicle)
        .then(vehicle => res.status(200).json(vehicle))
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
    CarOwner.findByIdAndDelete(req.params.id)
        .then(vehicle => res.status(202).json(vehicle))
        .catch(next)
}