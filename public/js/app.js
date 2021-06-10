// console.log('Client side javascript file is loaded!')


// to get the API output into client side javascript, we have to use the FETCH API
// FETCH API doesn't work with Node.JS

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
const fetchData = (location) => {

    fetch('http://localhost:3000/Weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location

            const {curr_temp, feels_like_temp, forecast } = data.forecast
            messageTwo.textContent = `${forecast}. It is ${curr_temp} degrees Farenheit and feels like ${feels_like_temp}.`
            console.log(data.forecast)
        }
    })
})

}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    //this method prevents the browser from defaulting to a refresh when content is loaded so that you can actually see the results of your query
    e.preventDefault()
    
    messageOne.textContent = ''
    messageTwo.textContent = ''

    const location = search.value
    fetchData(location)

    messageOne.textContent = 'loading... please wait'
})