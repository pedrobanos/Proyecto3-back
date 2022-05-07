const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ORSchema = new Schema({


    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    entryKms: {
        type: Number,
        required: [true, "must need car's kms "]
    },
    damageFotos: {
        type: [String],
        default: "https://desguaceslacabaña.com/blog/wp-content/uploads/2019/02/vehiculo-siniestro-total-desguace-2.png"
    },
    descriptionProblem: {
        type: String,
        required: [true, "We need to know the problem, please provide it "],
        minlength: [10]
    },
    operation: {
        type: [String],
        required: [true, "Please provide solution to fix the car"]
    },
    qty: {
        type: Number,
        required: [true, "need a quantity"]
    },
    price: {
        type: Number,
        required: [true, "need a value"]
    },
    discount: {
        type: Number,
    }
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