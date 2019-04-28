const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000; 

const hbs = require('hbs')
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kees'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kees'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How do I do this?',
        name: 'Kees' 
    });
});

app.get('/weather', (req, res) => {
    if (req.query.address) {

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
        
            forecast(latitude, longitude, (error, forecast) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }

                res.send({
                    forecast,
                    location,
                    address: req.query.address
                });
            });
            
        });
    
    } else {
        res.send({
            error: "No address"
        })
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help is not available',
        name: 'Kees' 
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        name: 'Kees' 
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})