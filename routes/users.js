const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User model
const User = require('../models/User');


//Login
router.get('/login', (req,res)=>{
    res.render('login');
});

//SignUp
router.get('/signup', (req,res)=>{
    res.render('signup');
});

//SignUp Handel
router.post('/signup',(req,res)=>{
    console.log(req.body);
    const {email,name,accountNumber,password,password2} = req.body;
    let errors = [];

    //Checking
    if(!name || !email || !accountNumber || !password || !password2 ) {
        errors.push({msg : 'Fill all the fields.'});
    }
    if(password2!=password) {
        errors.push({msg:'Password did not match.'})
    }
    if(password.length<6) {
        errors.push({msg:'Password length must be atleast 6 characters'})
    }
    if(accountNumber.toString().length<9) {
        errors.push({msg:'Account Number must atleast have  9 numbers'})
    }

    if(errors.length>0) {
        res.render('signup',{errors,email,name,accountNumber})
    }
    else{
        User.findOne({email : email})
        .then(user=>{
            if(user) {
                errors.push({msg:'Email is Already Registered'});
                res.render('signup',{errors,name,accountNumber})
            }
            else{
                User.findOne({accountNumber:accountNumber})
                .then(user=> {
                    if(user) {
                        errors.push({msg:'Account Number is Already Taken'});
                         res.render('signup',{errors,name,email})
                    }
                    else{
                        const newUSer = new User({email,name,accountNumber,password});
                        
                        //encrypt pass
                        bcrypt.genSalt(10,(err,salt)=>{
                            bcrypt.hash(newUSer.password,salt,(err,hash)=>{
                                if(err) throw err;
                                newUSer.password=hash;

                                //Save User
                            newUSer.save()
                            .then(user => {
                                req.flash('success_msg','You are ready to Login');
                                res.redirect('/users/login');
                            })
                            .catch((err)=>console.log(err));
                            })
                        })
                    }
                })
            }
        })
    }
})

//Login Handle 
router.post('/login' , (req,res, next)=> {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
})

//Logout Handel
router.get('/logout',(req,res)=> {
    req.logOut();
    req.flash('success_msg','You Are Logged Out');
    res.redirect('/users/login');
})

module.exports = router;