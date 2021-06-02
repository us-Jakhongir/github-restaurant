const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');

console.log(process.env.NODE_ENV);
console.log(app.get('env'));

if (!config.get('jwtPrivateKey')){
    console.error('JIDDIY XATO: github-restaurant_jwtPrivateKey muhit o\'zgaruvchisi aniqlanmagan');
    process.exit(1);
};


mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected MongoDB..');
    })
    .catch((err) => {
        console.error('Connection error', err)
    });

const userRoute = require('./routes/user');
const ordersRoute = require('./routes/orders');
const restaurantRoute = require('./routes/restaurant');
const foodRoute = require('./routes/food');
const authRoute = require('./routes/auth');




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
