const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

//Express Configuration - define paths
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up location for Static Files
app.use(express.static(publicDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Robert Willner'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Robert Willner'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'We are here to help',
        name: 'Robert Willner'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: data.location
            });
        })

    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Help article not found',
        name: 'Robert Willner'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Your page was not found',
        name: 'Robert Willner'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});


