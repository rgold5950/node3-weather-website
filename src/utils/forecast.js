const request = require('request')

//test url for seeing sample output: 
// http://api.weatherstack.com/current?access_key=f6a889c4b9153e8b6b2910ad46431b63&query=42.3601,-71.0589&units=f

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f6a889c4b9153e8b6b2910ad46431b63&query=' + longitude + ',' + latitude + '&units=f'

//call request and provide 2 arguements
    request({url: url, json: true}, (error, {body}) => {

    if(error) {
        callback('Unable to connect to weather service')
    } else if (body.error) {
        callback('Unable to find location')
    } else {
        callback(undefined, {
            curr_temp : body.current.temperature,
            feels_like_temp : body.current.feelslike, 
            forecast : body.current.weather_descriptions,
            other_facts : {wind_speed: body.current.wind_speed,
                        wind_degree: body.current.wind_degree,
                        wind_dir : body.current.wind_degree,
                        is_day : body.current.is_day }})

    }
})

}

module.exports = forecast
