// console.log('Client side javascript file is loaded!')


// to get the API output into client side javascript, we have to use the FETCH API
// FETCH API doesn't work with Node.JS

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
const fetchData = (location) => {

    fetch('/Weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location

            const {curr_temp, feels_like_temp, forecast, other_facts } = data.forecast
            // const {wind_speed, wind_dir, wind_degree, is_day} = other_facts
            messageTwo.textContent = `${forecast}. It is ${curr_temp} degrees Farenheit and feels like ${feels_like_temp}.`
            const {wind_speed, wind_degree, wind_dir, is_day} = other_facts
            messageThree.textContent = `Wind Speed: ${wind_speed}; Wind Degree: ${wind_degree}; Wind Direction: ${wind_dir}; Daytime?: ${is_day}`
            console.log(data.forecast)
            console.log('hello')
        }
    })
})

}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    //this method prevents the browser from defaulting to a refresh when content is loaded so that you can actually see the results of your query
    e.preventDefault()
    
    messageOne.textContent = ''
    messageTwo.textContent = ''
    messageThree.textContent = ''

    const location = search.value
    fetchData(location)

    messageOne.textContent = 'loading... please wait'
})