const OR = require('../models/OR.model')


module.exports.list = (req, res, next) => {
    OR.find()
        .populate('vehicle'
        // ,'carOwner'
        )
        .then(ors => {
            if (!ors) {
                res.status(200).json([])
            } else {
                res.status(200).json(ors)
            }
        })
        .catch(next)
}

module.exports.create = (req, res, next) => {
    console.log(req.body)
    const or = req.body

    if (req.files) {
        or.damageFotos = req.files.map(file => file.path)
      }

    OR.create(or)
        .then(or => res.status(200).json(or))
        .catch(e => console.log(e))
}

module.exports.detail = (req, res, next) => {
    OR.findById(req.params.id)
        .populate({
            path: 'vehicle',
            populate: {
                path: 'carOwner'
            }
        })
        .then(or => res.status(200).json(or))
        .catch(next)
}

module.exports.update = (req, res, next) => {
    console.log(req.params.id)
    OR.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(or => {
            console.log(or, req.body)
            res.status(200).json(or)
        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    OR.findByIdAndDelete(req.params.id)
        .then(or => res.status(202).json(or))
        .catch(next)
}

