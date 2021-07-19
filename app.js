const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport =require('passport');


const app = express();

//DB Config
const db = require('./config/keys').MongoURI

//Connect Mongo
mongoose.connect(db, {useNewUrlParser : true , useUnifiedTopology : true , useFindAndModify: false }).then(()=>console.log('MongoDB Connected')).catch(err=>console.log(err));

//Passport Config
require('./config/passport')(passport);

//ejs
app.set('view engine','ejs');

//To include script in js
app.use(express.static(__dirname));

//MIDDLE WARES
// BodyParser
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended : false}))
//Express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
  //Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());
//connect flash
app.use(flash());

//GlobalVars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));



const Port = process.env.PORT || 3000;

app.listen(Port , console.log('Hey there you are on port 3000'));