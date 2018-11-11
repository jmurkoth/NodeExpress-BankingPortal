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

// read the accounts
const accountData=fs.readFileSync(path.join(__dirname,'json/accounts.json'),'utf8');
const accounts = JSON.parse(accountData);

// read the users
const userData=fs.readFileSync(path.join(__dirname,'json/users.json'),'utf8');
const users = JSON.parse(userData);

//set the default route
app.get('/',(req, res)=>{
    res.render('index',{title:'Account Summary', accounts:accounts});
});

//set the savings route
app.get('/savings',(req, res)=>{
    res.render('account',{account:accounts.savings});
});

//set the savings route
app.get('/checking',(req, res)=>{
    res.render('account',{account:accounts.checking});
});

//set the savings route
app.get('/credit',(req, res)=>{
    res.render('account',{account:accounts.credit});
});

//set the profile route
app.get('/profile',(req,res)=>{
    res.render('profile',{user:users[0]});
});

app.listen(3000,()=>{
    console.log('PS project running on port 3000');
});