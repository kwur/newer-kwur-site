const mongoose = require("mongoose");
require("dotenv").config()
// from: https://medium.com/@anandam00/build-a-secure-authentication-system-with-nodejs-and-mongodb-58accdeb5144

const fileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      unique: false,
    },
    sourceUrl: {
      type: String,
      required: true,
      unique: false,
    },
    fileType: {
        type: String,
        required: false,
    }
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;