const mongoose = require("mongoose");
require("dotenv").config()

const showSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        coDJ: {
            type: Object,
            required: false
        },
        showName: {
            type: String,
            required: true,
            unique: true,
        },
        showTime: {
            type: Object,
            required: true,
            unique: true
        },
    },
    { timestamps: true }
);

const Show = mongoose.model("Show", showSchema);

module.exports = Show;