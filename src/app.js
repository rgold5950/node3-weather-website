const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
//customizing the name and directory for hbs
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory for serving
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Richard Goldman"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page Waddup",
        name: "Richard G. II"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page - Yass",
        name: "Richard Y. The Mighty",
        helpText: "Helpful Text Here"
    })
})

app.get('/Weather', (req, res) => {

    if (!req.query.address) {
        return res.send(
            {
                error: "Please provide a valid address"
            })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
        if (error) {
            return res.send({error})
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            
            if (error){
                return res.send({error})
            }

            console.log(req.query.address)
            console.log(forecastData)
            res.send({ 

                forecast: forecastData,
                location,
                address: req.query.address
            })
    
          })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []

    })
})

//404 handler for any page in the help repository
app.get('/help/*', (req, res) => {
    res.render('404-generic-error', {
        title: 'Help Article Not Found',
        supporting_info: "Please head back to the help page",
        name: "Richard Goldman"
    })
})

// 404 handler with * wildcard
app.get('*', (req, res) => {
    res.render('404-generic-error', {
        title: 'Error, Page Not Found',
        supporting_info: "Please head back to the main page",
        name: "Richard Goldman"
    })
})

// app.com
// app.com/help
// app.com/about
// app.com/weather

// start the server up, for this example, we use the common development port 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})