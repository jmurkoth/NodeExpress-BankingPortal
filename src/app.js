const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

//set the view engine
app.set('view engine','ejs');

//set the view directory
app.set('views',path.join(__dirname,'views'));

// set the static resource directory
app.use(express.static(path.join(__dirname,'public')));

//set the default route
app.get('/',(req, res)=>{
    res.render('index',{title:'Index'});
});

app.listen(3000,()=>{
    console.log('PS project running on port 3000');
});