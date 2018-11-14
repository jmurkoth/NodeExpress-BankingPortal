const express = require('express');
const router =express.Router();
const {accounts,writeJSON}= require('../data');


// set the transfer route
router.get('/transfer',(req,res)=>{
    res.render('transfer');

}) ;

//transfer post route
router.post('/transfer',(req,res)=>{
    //console.log(`Post Initiated FROM BALANCE ${ accounts[req.body.from].balance} TO BALANCE : ${ accounts[req.body.to].balance} Amount :${req.body.amount}`);
    accounts[req.body.from].balance =accounts[req.body.from].balance- req.body.amount;
    accounts[req.body.to].balance =parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount,10);
   // console.log(`Post Final FROM BALANCE: ${ accounts[req.body.from].balance} TO BALANCE : ${ accounts[req.body.to].balance}`);
    writeJSON();
    res.render('transfer',{message:'Transfer Completed'});

}) ;

// payment get route
router.get('/payment',(req,res)=>{
    res.render('payment',{account: accounts.credit});
});

//payment post route
router.post('/payment',(req,res)=>{
    // handle the saving now
    //console.log(`Post Initiated FROM BALANCE ${ accounts.credit.balance} Amount :${req.body.amount}`);
    accounts.credit.balance-=req.body.amount;
    accounts.credit.available+=parseInt(req.body.amount,10);
    //console.log(`Post Final FROM BALANCE ${ accounts.credit.balance} Amount :${req.body.amount}`);
    writeJSON();
    res.render('payment',{account: accounts.credit,message:'Payment Successful'});
});

module.exports =router;