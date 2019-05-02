let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());
let bodyParser = require('body-parser');
let passport = require('passport');
let authJwtController = require('./auth_jwt');
let User = require('./User');
let Reviews = require('./Review');
let Response = require('./response');
module.exports = app; // for testing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const https = require('https');
app.use(passport.initialize());
const request = require('request');
var router = express.Router();
var http = require('http');
const fetch = require("node-fetch");
router.route('/postjwt')
    .post(authJwtController.isAuthenticated, function (req, res) {
            console.log(req.body);
            res = res.status(200);
            if (req.get('Content-Type')) {
                console.log("Content-Type: " + req.get('Content-Type'));
                res = res.type(req.get('Content-Type'));
            }
            res.send(req.body);
        }
    );


app.route('/users/:userId')
    .get(authJwtController.isAuthenticated, function (req, res) {
        var id = req.params.userId;
        User.findById(id, function(err, user) {
            if (err) res.send(err);
            var userJson = JSON.stringify(user);
            // return that user
            res.json(userJson);
        });
    });


app.route('/users')
    .get(authJwtController.isAuthenticated, function (req, res) {
        User.find(function (err, users) {
            if (err) res.send(err);
            // return the users
            res.json(users);
        });
    });


app.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    }
    else {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        // save the user
        user.save(function(err) {
            if (err) {
                // duplicate entry
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists. '});
                else
                    return res.send(err);
            }

            res.json({ success: true, message: 'User created!' });
        });
    }
});
//Getting data from itunes.apple.com/rss/customerreviews/id=407358186/sortBy=mostRecent/xml
https.get('https://itunes.apple.com/rss/customerreviews/id=407358186/sortBy=mostRecent/json', (resp) => {
    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        let rssJson = JSON.parse(data);
        //sum rating
        var sum = rssJson.feed.entry.reduce( ( sum, cur ) => sum + parseInt(cur["im:rating"].label) , 0);
        console.log(sum);
        for(let entry of rssJson.feed.entry) {
            console.log(entry);
            console.log("id " + entry.id.label + " rating " + entry["im:rating"].label + " title " + entry.title.label + " Review " + entry.content.label + " Author " + entry.author.name.label);
            /*let newReviews = Reviews();
            newReviews.reviewId = entry.id.label;
            newReviews.reviewerName = entry.author.name.label;
            newReviews.reviewTitle = entry.title.label;
            newReviews.reviewComment = entry.content.label;
            newReviews.reviewRate = entry["im:rating"].label;
            newReviews.reviewContact = entry.contact;
            newReviews.reviewDate = Date.now();
            newReviews.save();
            Reviews.findOne(entry.id.label, function (found) {
                if (found)
                {
                    return null;
                }else
                    newReviews.save();
            })*/
        }
    });
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// Use at least Nodemailer v4.1.0
    const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        // Message object
        let message = {
            from: 'Review APP <reviewapp@ucd.com>',
            to: 'Yves Nsenga <yves.nsenga@ucdenver.edu>',
            subject: 'Nodemailer is unicode friendly ✔',
            text: Reviews.reviewId,
            //html: '<p><b>Hello</b> to myself!</p>'
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });

    app.route('/review')
        .get(authJwtController.isAuthenticated, function (req, res) {
            Reviews.find(function (err, reviews) {
                if (err) res.send(err);
                res.json(reviews);
            })
        });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});

app.route('/response')
    .get(authJwtController.isAuthenticated, function (req, res) {
        Response.find(function (err, response) {
            if (err) res.send(err);
            res.json(response);
        })
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});


app.use('/', router);
app.listen(process.env.PORT || 1000);