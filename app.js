const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const restoreLocal = require('./book');
const app = express();

app.engine('hbs', exphbs({
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.set('views', __dirname + '/views');

app.use(express.urlencoded({extended: true}));

app.use(express.json());

//app.use(storage);

app.use(routes);

app.listen(5000, () => {
    console.log('Server now running.');
});

module.exports = app