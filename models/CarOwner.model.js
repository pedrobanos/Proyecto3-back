const mongoose = require('mongoose')

const EMAIL_REGEX =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const NIFORNIE_REGEX = /^(\d{8})([A-Z])$/ || /^[XYZ]\d{7,8}[A-Z]$/;
const PHONE_REGEX = /^\+?([6-9]\d{2}|7[1-9]\d{1})\d{6}$/;
const ZIPCODE_REGEX = /^\d{5}(?:[- ]?\d{4})?$/;


const carOwnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [EMAIL_REGEX, 'Email has to be valid']
        },
        nifOrNie: {
            type: String,
            unique: true,
            required: [true, 'NIF/NIE is required'],
            trim: true,
            uppercase: true,
            match: [NIFORNIE_REGEX, 'Invalid NIF or NIE']
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


const CarOwner = mongoose.model('CarOwner', carOwnerSchema)

module.exports = CarOwner