const fs = require('fs');
const path = require('path');
const express = require('express');
const {accounts} = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');


const app = express();

//set the view engine
app.set('view engine','ejs');

//set the view directory
app.set('views',path.join(__dirname,'views'));

// set the static resource directory
app.use(express.static(path.join(__dirname,'public')));

//set the encoded url
app.use(express.urlencoded({extended:true}));

//set the routes
app.use('/services', servicesRoutes);
app.use('/account',accountRoutes);


//set the default route
app.get('/',(req, res)=>{
    res.render('index',{title:'Account Summary', accounts:accounts});
});


//set the profile route
app.get('/profile',(req,res)=>{
    res.render('profile',{user:users[0]});
});


//run the server
app.listen(3000,()=>{
    console.log('PS project running on port 3000');
});