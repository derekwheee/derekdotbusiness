const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(`${__dirname}/dist`));

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

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
