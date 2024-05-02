const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
require("dotenv").config()

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      unique: false,
      default: "placeholder"
    },
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, 
      required: true,
      unique: false
    },
    role: {
      type: String,
      default: "DJ",
    },
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next()
    }
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(user.password, salt).then((hashed) => {
            user.password = hashed
            next()
        }).catch(e => next(e))
    }).catch(e => next(e));
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password).then((res) =>{
    return res
  });
};

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema);

module.exports = User;