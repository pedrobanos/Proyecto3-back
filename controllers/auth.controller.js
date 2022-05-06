const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const Garage = require('../models/Garage.model')

module.exports.create = (req, res, next) => {
  const garage = req.body
  Garage.findOne({ cif: req.body.cif })
    .then(bbddGarage => {
      if (bbddGarage) {
        next(createError(404, { errors: { cif: 'CIF has been already registered' } }))
      } else {
        Garage.create(garage)
          .then(garage => res.status(201).json(garage))
      }
    })
    .catch(next)
}



module.exports.login = (req, res, next) => {

  const { password, cif } = req.body

  const throwException = () => next(createError(401, 'Incorrect credentials'))

  if (!cif || !password) {
    return throwException()
  }

  Garage.findOne({ cif })
    .then((garage) => {
      if (!garage) {
        throwException()
      } else {
        return garage.checkPassword(password)
          .then(match => {
            if (!match) {
              throwException()
            } else {
              res.json({
                access_token: jwt.sign(
                  {
                    id: garage.id
                  },
                  process.env.JWT_SECRET || 'changeme',
                  {
                    expiresIn: '1h'
                  }
                )
              })
            }
          })
      }
    })
    .catch(next)
}