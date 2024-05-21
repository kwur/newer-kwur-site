
const cloudinary = require("cloudinary").v2
const express = require("express")
const passport = require("passport")
const fileModel = require("../models/File")
const multer = require("multer")
const streamifier = require("streamifier")


require("dotenv").config()

const router = express.Router()
// setup multer for file upload
const store = multer.diskStorage({
    destination: './uploadedFiles',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ store: store })

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
}); 

router.post("/fileUpload", upload.single("file"), (req, res) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: error })
        }
        else if (!user) {
            res.status(401).send({ error: "invalid auth" })
        }
        else {
            const uploadFile = (successCB, failureCB) => {
                const s = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        successCB(result)
                    } else {
                        failureCB(error)
                        return
                    }
                });
                streamifier.createReadStream(req.file.buffer).pipe(s);
            }
            uploadFile((result) => {
                //what do you want to do with file after it has been uploaded
                fileModel.create({
                    path: req.body.path,
                    sourceUrl: result.url,
                    fileType: req.file.mimetype.split("/")[1].toUpperCase()
                }).then(didItWork => {
                    if(didItWork) {
                        res.status(200).send({url: result.url})
                    }
                }).catch(e => {
                    console.log(e)
                    res.status(500).send({error: e})
                })
            }, (error) => {
                console.log(error)
            })
        }
    })(req, res)
})

router.post("/getFileForPath", (req, res) => { 
    fileModel.find({path: req.body.path}).then(files => {
        res.status(200).send({files: files})
    }).catch(e => {
        console.log(e)
        res.status(500).send({error: e})
    })
})


module.exports = router