var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
const app =express()
const path = require('path')
const router = express.Router()

//This below will create a new S3 object based on the credintails and there are lot of paremaeters which can passed to constructor
const s3 = new aws.S3({
 accessKeyId: 'AKIAJG7K7TEZZHV52CUA',
 secretAccessKey: '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',
 Bucket: 'hariuploadtestbucket'
});

app.post('/',(req,res)=>{
//  res.send("<h1><b>hello word express</h1></b>")
  profileImgUpload(req,res,(error)=>{
    console.log(req.file)
    if(error)
    {
      console.log(error)
      res.json({"error":error})
    }
    else
    {
      if (req.file === undefined)
      {
        console.log("no file selected")
        res.json("error no files selected")
      }
      else{
        const imagename = req.file.key
        const imagelocation = req.file.location
        console.log("all sucessful")
        res.status(200).send()
      }
      }
  })
})

const profileImgUpload = multer({
 storage: multerS3({
  s3: s3,
  bucket: 'hariuploadtestbucket',
  acl: 'public-read',
  key: function (req, file, cb) {
  // cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
  cb(null,file.originalname)
  }
 }),
 limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
// fileFilter: function( req, file, cb ){
//  checkFileType( file, cb );
// }
}).single('profileImage');

app.listen(3000,()=>{
   console.log('server listening at port 3000')
 })
