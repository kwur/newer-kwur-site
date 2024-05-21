const mongoose = require("mongoose");
require("dotenv").config()
// i don't like doing it this way but don't think there is another way to do it...
const scheduleSchema = new mongoose.Schema(
    {
        status: {
            type: Boolean,
            default: false
        },
        dateChanged: Date
    },
    { timestamps: true }
);

const Schedule = mongoose.model("SchedulerOpen", scheduleSchema);

module.exports = Schedule;