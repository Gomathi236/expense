require("dotenv").config();
import express from "express"


import router from "./routes/web"
import configViewEngine from "./configs/viewengine"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import connectFlash from "connect-flash"
import session from "express-session"
import passport from "passport"

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(connectFlash());

const path = require('path')
app.use('/public', express.static('public'));
app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));


configViewEngine(app);

app.use(passport.initialize());
app.use(passport.session());


app.use('/', router);




let port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`App is listening on port ${port}!`))