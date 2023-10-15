const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    cname: {
        type: String,
        required: true,
        unique: true,
    },
    semester: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    fees: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("courses", courseSchema);