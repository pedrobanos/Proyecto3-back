const CarOwner = require('../models/CarOwner.model')


module.exports.list = (req, res, next) => {
    CarOwner.find()
        .then(carOwners => {
            if (!carOwners) {
                res.status(200).json([])
            } else {
                res.status(200).json(carOwners)
            }
        })
        .catch(next)
}

module.exports.create = (req, res, next) => {
    const carOwner = req.body
    CarOwner.create(carOwner)
        .then(carOwner => res.status(200).json(carOwner))
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    CarOwner.findById(req.params.id)
        .then(carOwner => res.status(200).json(carOwner))
        .catch(next)
}

module.exports.update = (req, res, next) => {
    console.log(req.params.id)
    CarOwner.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(carOwner => {
            console.log(or, req.body)
            res.status(200).json(carOwner)
        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    CarOwner.findByIdAndDelete(req.params.id)
        .then(carOwner => res.status(202).json(carOwner))
        .catch(next)
}