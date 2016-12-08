const express = require('express');
const handlebars  = require('express-handlebars');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

app.engine('.hbs', handlebars({
    defaultLayout : 'main',
    extname : '.hbs',
    layoutsDir : 'views/layouts/',
    partialsDir : 'views/partials/',
}));
app.set('view engine', '.hbs');

// HTTPS Enforcement Redirect
app.get('*',function(req, res, next){

    const exceptions = req.hostname === 'localhost' ||
                       req.hostname.match(/\.local$/);



                       Object.keys(req.headers).forEach(function(key) {
                           console.log(`Header: ${req.headers[key]}`);
                       });

    if (!req.secure && !exceptions) {
        console.log(`Insecure: ${req.hostname}`);
        console.log(`Insecure: ${req.protocol}`);

        Object.keys(req.headers).forEach(function(key) {
            console.log(`Header: ${req.headers[key]}`);
        });

        res.redirect(301, `https://derek.business${req.originalUrl}`);
    } else {
        next();
    }

});

// Canonical Hostname Enforcement Redirect
app.get('*',function(req, res, next){

    const exceptions = req.hostname === 'localhost' ||
                       req.hostname.match(/\.local$/) ||
                       req.hostname.match(/\.herokuapp.com$/) ||
                       req.hostname.match(/^derek\.business$/);

    if (!exceptions) {
        console.log(`Incorrect hostname: ${req.hostname}`);
        res.redirect(301, `https://derek.business${req.originalUrl}`);
    } else {
        next();
    }

});

app.get('/', function(req, res) {
  res.render('home');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
