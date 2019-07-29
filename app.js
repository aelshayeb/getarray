const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
// const path = require('path');


const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs and middlewares
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

// Static folder
// app.use(express.static(path.join(__dirname, 'public')));

// load pages
app.get('/', function(req, res) {
    res.render('pages/index');
});
// success page 
app.get('/success', function(req, res) {
    res.render('pages/success', {
        
    });
});
// fail page 
app.get('/fail', function(req, res) {
    res.render('pages/fail');
});

// payments from Stripe API
app.post('pages/charge', function(req,res) {

});


// Signup Route
app.post('/signup', (req, res) => {
  const { email } = req.body;

  // Make sure fields are filled
  if (!email) {
    res.redirect('/fail');
    return;
  }

  // Construct req data for mailchimp API
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed'
      }
    ]
  };


  const postData = JSON.stringify(data);

  const options = {
    url: 'https://us3.api.mailchimp.com/3.0/lists/698d038e0b',
    method: 'POST',
    headers: {
      Authorization: 'auth 3c7ddb9e402158391acf5d1fa2418dc9-us3'
    },
    body: postData
  };

  request(options, (err, response, body) => {
    if (err) {
      res.redirect('/fail');
    } else {
      if (response.statusCode === 200) {
        // res.redirect('/success');
        // rendering success message in HTML via ejs
        // res.render('response', {data: req.body});
        
        console.log(req.body);
      } else {
        res.redirect('/fail');
      }
    }
  });
});


const PORT = process.env.PORT || 80;

app.listen(PORT, console.log(`Server started on ${PORT}`));