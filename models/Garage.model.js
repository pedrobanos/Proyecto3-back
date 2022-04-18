const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10
const EMAIL_PATTERN =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const CIF_PATTERN = 
    /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

const garageSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [EMAIL_PATTERN, 'Email has to be valid']
        },
        cif: {
            type: String,
            required: [true, 'CIF is required'],
            trim: true,
            uppercase: true,
            match: [CIF_PATTERN, 'CIF has to be valid']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must have at least 8 characters']
        }
    },
    {
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

garageSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, SALT_ROUNDS)
            .then(hash => {
                this.password = hash

                next()
            })
    } else {
        next()
    }
})

garageSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password)
}

const Garage = mongoose.model('Garage', garageSchema)

module.exports = Garage