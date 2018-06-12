var express = require('express');
require("dotenv").config();
var ejsLayouts = require('express-ejs-layouts');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: './uploads/'});
var cloudinary = require('cloudinary');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(ejsLayouts);

var images = [];

app.get('/', function(req, res){
    console.log('root get request hit')
    // res.send({thing:'Just made a simple change'})
    res.render('index', {cloudinary, images: images});
})

app.get('/upload', function(req,res){
    console.log('upload get route hit!');
    res.render('upload');
});

app.post('/upload',upload.single('myFile'), function(req, res){
    console.log(req.file.path)
    cloudinary.uploader.upload(req.file.path, function(result){
        console.log(result);
        images.push(result.public_id);
        res.redirect('/');
    })
})

app.get('*', function(req, res){
    res.send("Well this is awkward, you went to a place without a 404...You're doing so good!")
})

app.listen(3000, function(){
    console.log('Server working on port 3000')
});