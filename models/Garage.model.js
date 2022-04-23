const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10
const EMAIL_REGEX =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const CIF_REGEX =
    /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
const PHONE_REGEX = /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/;
const ZIPCODE_REGEX = /^\d{5}(?:[- ]?\d{4})?$/;
const FAX_REGEX= /^(\+)?(((((\d+)|(\(\d+\))|(\(\d+\s(\d)\)))(\s|-|\d+))+)|((\d+)|(\(\d+\))$)+)+\d$/;

const garageSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [EMAIL_REGEX, 'Email has to be valid']
        },
        cif: {
            type: String,
            unique: true,
            required: [true, 'CIF is required'],
            trim: true,
            uppercase: true,
            match: [CIF_REGEX, 'Invalid cif']
        },
        bussinesName: {
            type: String,
            required: [true, 'Name is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must have at least 8 characters']
        },
        address: {
            street: {
                type: String,
                required: [true, "Please enter a street."]
            },
            state: {
                type: String,
                required: [true, "Please enter a state."]
            },
            city: {
                type: String,
                required: [true, "Please enter a city."]
            },
            country: {
                type: String,
                required: [true, "Please enter a country."]
            },
            zipCode: {
                type: String,
                required: [true, "Please enter a zipcode."],
                match: [ZIPCODE_REGEX, 'Invalid zipcode']
            },
        },
        phoneNumber: {
            type: String,
            required: [true, "Please enter a phone number"],
            match: [PHONE_REGEX, 'Invalid phone number']
        },
        faxNumber: {
            type: String,
            match: [FAX_REGEX, 'Invalid fax number']
        },
        contactName: {
            type: String
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