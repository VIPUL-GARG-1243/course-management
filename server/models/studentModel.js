const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cname: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    pincode: {
        type: String,
        required: true
    },
    sname: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    spass: {
        type: String,
    },
    myfile: {
        type: String
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("students", studentSchema);