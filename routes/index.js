const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
const fetch = require('node-fetch');

//User Model
const User = require('../models/User');

//Welcome
router.get('/',(req,res)=>{
    res.render('welcome');
});

//Dashboard
router.get('/dashboard',(req,res)=>{
    let allUsers
    User.find({ })
    .then( user => {
        // console.log(user)
         allUsers = user
        //  console.log(allUsers,'^^^^^^^^^^^');
         res.render('dashboard',{
            user : JSON.stringify(req.user),
            allUsers : JSON.stringify(allUsers)
        });
    })
    // console.log(allUsers,'************');
});

//Payment
router.get('/pay',(req,res)=> {
    res.render('pay');
})

//Payment Handel
router.post('/pay',(req,res)=> {
    const {accountNumber,amount,user} = req.body;
    let errors = [];
    // let selfUser = req.user;
    // console.log(JSON.stringify(user));
    // console.log(user);
    if(!user) {
        errors.push({msg : 'Login To Pay'})
       return res.render('login', {errors})
    }
    let balance = JSON.parse(user).balance;
    // console.log(balance);
    let selfAccountNumber = JSON.parse(user).accountNumber
    if(!accountNumber || !amount){
        errors.push({msg:'Fill All Fields'});
    }
    if(amount>balance) {
        errors.push({msg:'Insufficient Balance'});
    }
    if(amount<0) {
        errors.push({msg:'Amount Cannot Be Negative'});
    }
    if(errors.length>0) {
        res.render('pay',{errors});
    }
    else{
        User.findOne({accountNumber : accountNumber})
        .then(user=> {
            if(!user) {
                errors.push({msg:'Account Number does not exist.'})
                res.render('pay',{errors})
            }
            else{
                let updateBalance= parseInt(user.balance)+parseInt(amount); //why to use parseint?
                // console.log(updateBalance)
                let selfUpdateBalance = parseInt(balance)-parseInt(amount);
                // console.log(selfUpdateBalance)
                let date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
                console.log(date);
                let recipt = {
                    dateAndTime : date,
                    status : 'Credit',
                    amount : amount
                }
                let selfRecipt = {
                    dateAndTime : date,
                    status : 'Debit',
                    amount : amount
                }
                updateHistory=user.history.push()
                User.findOneAndUpdate({accountNumber:accountNumber},{balance:updateBalance})
                .then(user=> {
                    let userHistory = user.history;
                    userHistory.push(recipt)
                    // console.log(user.history)
                    // console.log(userHistory)
                    User.updateOne({accountNumber:accountNumber},{history: userHistory})
                    .then(user => {
                        // console.log(user.history)
                    })
                })
                .catch(err => console.log(err))
                User.findOneAndUpdate({accountNumber:selfAccountNumber},{balance:selfUpdateBalance})
                .then(user=> {
                    let userHistory = user.history;
                    userHistory.push(selfRecipt)
                    User.updateOne({accountNumber: selfAccountNumber},{history: userHistory})
                    .then(user => {
                        // console.log(user.history)
                    })
                    req.flash('success_msg','Payment Successfull');
                    // errors.push({msg : 'Payment successfull'})
                    res.redirect('/dashboard')
                })
                .catch(err => console.log(err))

            }
        })
    }

})

//All Customers
router.get('/allCustomers', (req,res) => {
    res.render('allCustomers')
})

//History
router.get('/history',(req,res) => {
    res.render('history')
})

module.exports = router;