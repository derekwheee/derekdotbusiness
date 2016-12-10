const express = require('express');
const handlebars  = require('express-handlebars');
const app = express();
const posts = require('./app/posts.js');
const hbs = handlebars.create({
    defaultLayout : 'main',
    extname : '.hbs',
    layoutsDir : 'views/layouts/',
    partialsDir : 'views/partials/',
    helpers : require('./helpers.js')(handlebars)
});
var server;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

app.engine(".hbs", hbs.engine);
app.set('view engine', '.hbs');

// HTTPS Enforcement Redirect
app.get('*', function (req, res, next){

    var isSecure = false;
    const exceptions = req.hostname === 'localhost' ||
                       req.hostname.match(/\.local$/);

    // This is all because of Cloudflare Flexible SSL
    try {
        isSecure = JSON.parse(req.headers['cf-visitor']).scheme === 'https';
    } catch (err) {}

    if (!isSecure && !exceptions) {
        res.redirect(301, `https://derek.business${req.originalUrl}`);
    } else {
        next();
    }

});

// Canonical Hostname Enforcement Redirect
app.get('*', function (req, res, next){

    const exceptions = req.hostname === 'localhost' ||
                       req.hostname.match(/\.local$/) ||
                       req.hostname.match(/\.herokuapp.com$/) ||
                       req.hostname.match(/^derek\.business$/);

    if (!exceptions) {
        res.redirect(301, `https://derek.business${req.originalUrl}`);
    } else {
        next();
    }

});

app.get('/', function (req, res) {
    res.render('home', { posts : posts });
});

app.get('/blerg', function (req, res) {
    res.render('blerg', { posts : posts });
});

app.get('/blerg/:post', function (req, res) {
    res.render(`blerg/${req.params.post}`);
});

server = app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = {
    server : server,
    app : app
};
