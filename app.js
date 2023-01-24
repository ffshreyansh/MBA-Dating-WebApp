const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require("body-parser");
const { default: puppeteer } = require("puppeteer");
const app = express();
const MongoClient = require('mongodb').MongoClient;
let token = 10000;
app.use(bodyParser.urlencoded({ extended: false }));
const uri = "mongodb+srv://stickman:shreyansh@stickman.jtwgqqr.mongodb.net/?retryWrites=true&w=majority";




//Passport Config
require("./config/passport")(passport);


const PORT = process.env.PORT || 5000;
app.use(express.static("public"));

mongoose.set("strictQuery", false);


//DB config
const db = require('./config/keys').mongoURI

//Connect to mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected.."))
    .catch(err => console.log(err));
    
    // app.get('/success', (req, res) => {
    //     res.sendFile(__dirname + '/success.html');
    // });


    // app.get('/', (req, res) => {
    //     res.sendFile(__dirname + "/dashboard.ejs")
    // })








//EJS
// app.use(expressLayouts);
app.set('view engine', 'ejs');

//BodyParse
app.use(express.urlencoded({extended: true}))

//Express Session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session()); 

//flash
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});


//Routes
app.use('/', require("./routes/index.js"));
app.use('/users', require("./routes/users.js"));






app.listen(PORT, console.log(`Server started on port ${PORT}`));
