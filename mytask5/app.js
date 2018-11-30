/*
const express = require('express');
const app = express();

app.use(express.static('public'));

app.use('/modules', express.static('node_modules'));

app.listen(3000);*/
'use strict';
require('dotenv').config();
const express = require('express');
const db = require('./modules/database');
const resize = require('./modules/resize');
const exif = require('./modules/exif');

const fs = require('fs');
const https =require('https');
const http = require('http');
const bodyParser =require('body-parser');
const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const session = require('express-session');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});



const connection = db.connect();

const cb = (result, res) => {
  console.log(result);
  res.send(result);
};

app.use(express.static('public'));


passport.serializeUser((user, done)=> {
  console.log('serialize: ' + user);
  done(null, user);
});

passport.deserializeUser((user, done) => {

  done(null, user);
});

app.use(session({

  secret:'keyboard LOL cat',
  resave:true,
  saveUninitialized:true,
  cookie: {secure:true}

}));
passport.use(new LocalStrategy(
    (username, password, done)=> {
      console.log('Here we go: ' + username);
      if (username !== process.env.USER_NAME || password !== process.env.USER_PWD)
      {return done(null, false);}
      return done(null, {username:username});
    }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
    passport.authenticate('local', { successRedirect: '/node/index.html', failureRedirect: '/node/login.html' }));




// respond to post and save file
app.post('/upload', upload.single('mediafile'), (req, res, next) => {
  next();
});

app.set('trust proxy');
const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');

const options = {
  key: sslkey,
  cert: sslcert
}

//connection
app.get('/pic/', (req,res,next) =>{
  db.select(connection, cb, res);
});
// create thumbnail
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 300,
      './public/thumbs/' + req.file.filename + '_thumbs', next);
});

// create medium image
// create medium image
app.use('/upload/', (req, res, next) => {
  resize.doResize(req.file.path, 640,
      './public/medium/' + req.file.filename + '_medium', next);
});

// get coordinates
app.use('/upload/', (req, res, next) => {
  exif.getCoordinates(req.file.path).then(coords => {
    req.coordinates = coords;
    next();
  });
});

// insert to database
app.use('/upload/', (req, res, next) => {
  const data = [
    req.body.category,
    req.body.title,
    req.body.details,
    req.file.filename + '_thumb',
    req.file.filename + '_medium',
    req.file.filename,
    req.coordinates,
  ];
  db.insert(data, connection, next);
});

// get updated data form database and send to client
app.use('/upload', (req, res) => {
  db.select(connection, cb, res);
});

app.patch('/media/update', (req, res) => {

  db.update(req.body, connection);
  //responce.send( {"Job Status": "Unknown"} );
});
//update data of the image

//app.listen(8000);

http.createServer((req,res)=>{
  const redir ='https://' + req.headers.host + '/node' + req.url;
  console.log(redir);
  res.writeHead(302,{'Location': redir});
  res.end();
}).listen(8000);
https.createServer(options,app).listen(3000);

