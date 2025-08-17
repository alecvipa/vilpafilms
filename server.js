require('dotenv').config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const email = process.env.email;
const superSecretPwd = process.env.superSecretPwd;
const tokenFb = process.env.tokenAccesoFB

// Create an instance of the express app.
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Redirect to https://xyncs.com
const targetBaseUrl = 'https://www.vilpafilms.com/home';





// Routes
app.get('/', function (req, res) {
    res.redirect(targetBaseUrl);
    // res.render('home');

});
// app.get('/inicio', function (req, res) {
//     // res.redirect(targetBaseUrl);
//     res.render('inicio');

// });
app.get('/home', function (req, res) {
    var params = req.params.params;
    res.render('home');
});

app.get('/contact', function (req, res) {
    var params = req.params.params;
    res.render('contact');
});

app.get('/privacy', function (req, res) {
    var params = req.params.params;
    res.render('privacy');
});
app.get('/popkrn', function (req, res) {
    var params = req.params.params;
    res.render('popkrn');
});
app.get('/koverage', function (req, res) {
    var params = req.params.params;
    res.render('koverage');
});
app.get('/broadkst', function (req, res) {
    var params = req.params.params;
    res.render('broadkst');
});
app.get('/broadkst-checkout-liveaction', function (req, res) {
    var params = req.params.params;
    res.render('broadkst-checkout-liveaction');
});
app.get('/broadkst-checkout-animation', function (req, res) {
    var params = req.params.params;
    res.render('broadkst-checkout-animation');
});
app.get('/broadkst-checkout-documentary', function (req, res) {
    var params = req.params.params;
    res.render('broadkst-checkout-documentary');
});

app.get('/broadkst-checkout-experimental', function (req, res) {
    var params = req.params.params;
    res.render('broadkst-checkout-experimental');
});
app.get('/terms-koverage', function (req, res) {
    var params = req.params.params;
    res.render('terms-koverage');
});

// Nodemailer route

app.post("/ajax/email", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    var htmlBody = `<h2>Correo de contacto</h2><p>Nombre: ${request.body.name} </p><p> Correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Mensaje:${request.body.message} </p>`;
    var mail = {
        from: '"Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Te ha llegado un correo en Vilpa Films!',
        html: htmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    });
});



// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});