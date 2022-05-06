const mongoose = require('mongoose')


const vehicleSchema = new mongoose.Schema(
    {
        plate: {
            type: String,
            unique: true,
            required: [true, 'plate is required']
        },

        vin: {
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

        vehicleInsurance: {
            type: String,
         },

         carOwner: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'CarOwner'
       }
       
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