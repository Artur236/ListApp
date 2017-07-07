const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

var db;

app.set('view engine', 'ejs');

MongoClient.connect('mongodb://artur236:epson236@ds151452.mlab.com:51452/quotes-app', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray(function(err, result) {
    if (err) return console.log(err);

    res.render('index.ejs', {quotes: result});
  });
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to db');
    res.redirect('/');
  });
});
