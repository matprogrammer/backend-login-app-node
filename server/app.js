const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const config = require('./config/config');
const indexRoutes = require('./routes/index')
const uri = "mongodb+srv://socialdb:maguiar14@socialdb-tt3eo.gcp.mongodb.net/socialdb?retryWrites=true&w=majority";
const path = require('path');
const cors = require('cors');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(db => console.log('db conected.'))
.catch(err => console.log('db error: ' + err));

app.set('key', config.key);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', indexRoutes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors());

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
