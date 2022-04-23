const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ORSchema = new Schema({

    carOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarOwner'
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    damageFotos: {
        type: String,
        default: "https://desguaceslacabaña.com/blog/wp-content/uploads/2019/02/vehiculo-siniestro-total-desguace-2.png"
    },
    descriptionProblem: {
        type: String,
        required: [true, "Introduzca el lugar"]
    },
    operation: {
        type: String,
        required: [true, "Introduzca la ubicación"]
    },
    price: {
        netPrice: {
            type: Number,
            required: [true, "Introduzca un valor numerico"]
        },
        discount: {
            type: Number,
            required: [true,  "Introduzca un valor numerico"]
        },
        vat: {
            type: Number,
            required: [true,  "Introduzca un valor numerico"]
        },
        total: {
            type: Number,
            required: [true,  "Introduzca un valor numerico"]
        }
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.social;
            return ret;
        }
    },
    toObject: {
        virtuals: true
    }
})

// OR.find()
// .populate('carOwner', 'vehicle')

const OR = mongoose.model('OR', ORSchema)
module.exports = OR