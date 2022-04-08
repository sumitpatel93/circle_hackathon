const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const routes = require('./routes/routes');
const payoutsRoutes = require('./routes/payouts');
const walletRoutes = require('./routes/wallets');



app.use(bodyParser.json());
app.use(cors());

mongoose
        .connect('mongodb://localhost:27017',{
            useNewUrlParser: true
        })
        .then(() => console.log('connected to mongoDB'))
        .catch((err) => console.error(err));


app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.use('/circleHackathon', routes);
app.use('/payouts',payoutsRoutes);
app.use('/wallets',walletRoutes);



app.listen(process.env.PORT, () => console.log('App is listening on port ' + process.env.PORT + '.'));