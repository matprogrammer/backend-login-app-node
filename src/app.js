const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const router = express.Router();

const uri = "mongodb+srv://socialdb:maguiar14@socialdb-tt3eo.gcp.mongodb.net/socialdb?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(db => console.log('db conectada'))
.catch(err => console.log('db error: ' + err));

const indexRoutes = require('./routes/index')

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
