const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user');
const ordersRoute = require('./routes/orders');
const restaurantRoute = require('./routes/restaurant');
const foodRoute = require('./routes/food');
const authRoute = require('./routes/auth');

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected MongoDB..');
    })
    .catch((err) => {
        console.error('Connection error', err)
    });

mongoose.set('useFindAndModify', false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

    

app.use('/api/users', userRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/food', foodRoute);
app.use('/api/auth', authRoute);




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server has been started on ${port}port`);
});
