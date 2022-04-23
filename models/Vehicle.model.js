const mongoose = require('mongoose')


const vehicleSchema = new mongoose.Schema(
    {
        plate: {
            type: String,
            required: [true, 'plate is required']
        },

        VIN: {
            type: String,
            required: [true, 'VIN is required']
        },
       
        make: {
            type: String,
            required: [true, 'Make is required']
        },
        model: {
            type: String,
            required: [true, 'Model is required']
        },
       
        year: {
            type: Number,
        },
        price: {
            type: Number,
        },
        horsepower: {
            type: Number,
        },
        image: {
            type: String,
            default: "https://www.diariomotor.com/imagenes/picscache/1920x1600c/bugatti-veyron-ficha-1017-193_1920x1600c.jpg"
          },

    },{
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.password
                delete ret.__v
                return ret
            }
        }
    }
)


const Vehicle = mongoose.model('Vehicle', vehicleSchema)

module.exports = Vehicle