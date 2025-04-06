const express = require('express')
const compression = require('compression')
const minify = require('express-minify');
const app = express()
const ejs = require("ejs");
const port = process.env.PORT || 8080
const path = require('path')
const formidable = require('express-formidable')
const nodemailer = require('nodemailer')
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const request = require('request');
require('dotenv').config()

const adminTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD
    }
});

app.use(compression())
app.use(minify());
app.use(express.static(__dirname + '/public'))
app.use(formidable());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    fs.readFile('./public/data.json', (err, data) => {
        if (err) throw err
        data = JSON.parse(data)
        let cards = data.cards
        let questions = data.questions
        let subjects = data.cereOfertaSubjects
        res.render('index.ejs', { cards: cards, questions: questions, subjects: subjects, reCaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY})
    })
})

function sendErrorEmailIfRequestFailed(type) {
    var mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: '[btc-agency] Request error',
        html: "<h1>There have been an request for " + type + " error on app btc-agency.<br>Check heroku logs for more details.</h1>"
    }
    adminTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }
    })
}

app.post('/cere_oferta', (req, res) => {
    if(req.fields['g-recaptcha-response'] === undefined || req.fields['g-recaptcha-response'] === '' || req.fields['g-recaptcha-response'] === null)
    {
      return res.json({"responseError" : "something goes to wrong"});
    }

    var secretKey = process.env.RECAPTCHA_SECRET_KEY;
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.fields['g-recaptcha-response'];
    request(verificationUrl,function(error,response,body) {
        if(error) {
            console.log(error);
            return;
        }
        
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success) {
          return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
        }
        
        // Recaptcha verification was successful
        ejs.renderFile('./views/offerEmail.ejs', { name: req.fields.name, email: req.fields.email, phone: req.fields.phone, subject: req.fields.subject, description: req.fields.description }, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                var mailOptions = {
                    from: process.env.ADMIN_EMAIL,
                    to: process.env.EMAIL_NAME,
                    subject: 'Cerere oferta noua',
                    html: data,
                    attachments: [
                        {
                            fileName: 'logo.png',
                            path: './public/images/detectivi-particulari-valcea-logo.png',
                            cid: 'logo'
                        }
                    ]
                }
    
                adminTransporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error)
                        sendErrorEmailIfRequestFailed("offer");
                        res.render('requestMessage.ejs', { source: "offer", type: "failure" })
                    } else {
                        console.log(info)
                        res.render('requestMessage.ejs', { source: "offer", type: "success" })
                    }
                })
            }
        })
      });
})

app.post('/ofera_rating', (req, res) => {
    let ratingString
    switch (req.fields.rating) {
        case "1":
            ratingString = "Very bad"
            break;
        case "2":
            ratingString = "Bad"
            break;
        case "3":
            ratingString = "Neutral"
            break;
        case "4":
            ratingString = "Good"
            break;
        case "5":
            ratingString = "Great"
            break;
        default:
            ratingString = "Unknown"

    }
    ejs.renderFile('./views/ratingEmail.ejs', { rating: ratingString, review: req.fields.review }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            var mailOptions = {
                from: process.env.ADMIN_EMAIL,
                to: process.env.EMAIL_NAME,
                subject: 'New rating',
                html: data,
                attachments: [
                    {
                        fileName: 'logo.png',
                        path: './public/images/board-games.png',
                        cid: 'logo'
                    }
                ]
            }
            adminTransporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                    sendErrorEmailIfRequestFailed("rating");
                    res.render('requestMessage.ejs', { source: "rating", type: "failure" })
                } else {
                    console.log(info)
                    res.render('requestMessage.ejs', { source: "rating", type: "success" })
                }
            })
        }
    })
})

app.get('/sitemap.xml', function (req, res) {
    res.sendFile(__dirname + '/sitemap.xml');
});

app.get('/robots.txt', function (req, res) {
    res.sendFile(__dirname + '/robots.txt');
});

app.get('*', (req, res) => {
    res.status(404).render('404Page.ejs')
})

app.listen(port, () => console.log('Server listening.'))