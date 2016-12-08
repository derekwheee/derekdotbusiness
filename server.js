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

app.get('/', function(req, res) {
  res.render('home');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
