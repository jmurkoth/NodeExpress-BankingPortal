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

//set the encoded url
app.use(express.urlencoded({extended:true}));

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

// set the transfer route
app.get('/transfer',(req,res)=>{
    res.render('transfer');

}) ;

//transfer post route
app.post('/transfer',(req,res)=>{
    //console.log(`Post Initiated FROM BALANCE ${ accounts[req.body.from].balance} TO BALANCE : ${ accounts[req.body.to].balance} Amount :${req.body.amount}`);
    accounts[req.body.from].balance =accounts[req.body.from].balance- req.body.amount;
    accounts[req.body.to].balance =parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount,10);
   // console.log(`Post Final FROM BALANCE: ${ accounts[req.body.from].balance} TO BALANCE : ${ accounts[req.body.to].balance}`);
    const accountsJSON= JSON.stringify(accounts,null,4);
    fs.writeFileSync(path.join(__dirname,'/json/accounts.json'),accountsJSON,'utf8');
    res.render('transfer',{message:'Transfer Completed'});

}) ;

// payment get route
app.get('/payment',(req,res)=>{
    res.render('payment',{account: accounts.credit});
});

//payment post route
app.post('/payment',(req,res)=>{
    // handle the saving now
    //console.log(`Post Initiated FROM BALANCE ${ accounts.credit.balance} Amount :${req.body.amount}`);
    accounts.credit.balance-=req.body.amount;
    accounts.credit.available+=parseInt(req.body.amount,10);
    //console.log(`Post Final FROM BALANCE ${ accounts.credit.balance} Amount :${req.body.amount}`);
    const accountsJSON= JSON.stringify(accounts,null,4);
    fs.writeFileSync(path.join(__dirname,'/json/accounts.json'),accountsJSON,'utf8');
    res.render('payment',{account: accounts.credit,message:'Payment Successful'});
});

//run the server
app.listen(3000,()=>{
    console.log('PS project running on port 3000');
});