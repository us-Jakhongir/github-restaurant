const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user');
const ordersRoute = require('./routes/orders');
const restaurantRoute = require('./routes/restaurant');
const foodRoute = require('./routes/food');

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected MongoDB..');
    })
    .catch((err) => {
        console.error('Connection error', err)
    });

app.use(express.json());
app.use(express.urlencoded({extended: true}))

    

app.use('/api/users', userRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/food', foodRoute);




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server has been started on ${port}port`);
});
