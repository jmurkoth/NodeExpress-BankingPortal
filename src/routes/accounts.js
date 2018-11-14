const express = require('express');
const {accounts}= require('../data');
const router =express.Router();

//set the savings route
router.get('/savings',(req, res)=>{
    res.render('account',{account:accounts.savings});
});

//set the savings route
router.get('/checking',(req, res)=>{
    res.render('account',{account:accounts.checking});
});

//set the savings route
router.get('/credit',(req, res)=>{
    res.render('account',{account:accounts.credit});
});

module.exports = router;