const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const config = require('./config/config');
const indexRoutes = require('./routes/index')
const uri = "mongodb+srv://socialdb:maguiar14@socialdb-tt3eo.gcp.mongodb.net/socialdb?retryWrites=true&w=majority";
const path = require('path');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(db => console.log('db conected.'))
.catch(err => console.log('db error: ' + err));

app.set('key', config.key);
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', indexRoutes);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', '../app/public/index.html'));
});

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
