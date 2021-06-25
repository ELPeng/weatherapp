const api = {
    key: "191720bee5b0a6f698a79473440f736e",
    baseurl:"https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box')
searchbox.addEventListener('keypress', setQuery)

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value)
        console.log(searchbox.value)
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(weather => weather.json())
        .then(displayResults)
}

function displayResults(weather){
    console.log(weather)
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.current .temp')
    temp.innerText = `${Math.round(weather.main.temp)}°F`
    let icon = document.querySelector('.weatherIcon')
    icon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    let climate = document.querySelector('.current .weather')
    climate.innerText = `${weather.weather[0].main}`
    let hiLo = document.querySelector('.current .hi-low')
    hiLo.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`
}

function dateBuilder(d){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    let day = days[d.getDay()]
    let dayNum = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${dayNum} ${month} ${year}`
}