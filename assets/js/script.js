var button = document.querySelector('.button');
var city = document.getElementById('name');
var temp = document.getElementById('temp');
var windSpeed = document.getElementById('windSpeed');
var humidity = document.getElementById('humidity');
var uvIndex = document.getElementById('uvIndex');
var img = document.getElementById('img');
var displayDate= document.getElementById('displayDate');
var pastSearchesButton = document.getElementById('.pastSearchesButton');

var cities = []

button.addEventListener('click', function(e){
    e.preventDefault()
    var inputValue = document.getElementById('inputValue').value;
    fiveDay(inputValue)
        fetch ('https://api.openweathermap.org/data/2.5/weather?q='+inputValue+'&units=imperial&APPID=f9d491be2c04cabd7a30f6d0ce1b0f1e')
        .then(response => response.json())
        .then(data => {
            var nameValue = data['name'] + " ";
            var date = moment();
            displayDate.innerText= date;
            img.setAttribute("src", `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`);;
            var tempValue = data['main']['temp'] + " degrees";
            city.innerText =  nameValue;
            temp.innerText = "Temp: " + tempValue;
            windSpeed.innerText = "Wind speed: " + data['wind']['speed']  + " MPH";
            humidity.innerText = "Humidity: " + data['main']['humidity'] + "%";
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            displayUvIndex(lat, lon)

            
            saveCity();
            searches();
            console.log("test")
        })

        .catch(err => alert('Error' + err))
})
//Save current search to localStorage
var saveCity = function () {
    var newCity = inputValue.value
    localStorage.setItem("City",JSON.stringify(cities));
    };
//display past searches from localStorage
var searches = function () {
    var displayCity = JSON.parse(localStorage.getItem("City"));
    console.log(displayCity);

    //pastSearchesButton.innerHTML = displayCity
}
function displayUvIndex (lat, lon) {
    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&APPID=f9d491be2c04cabd7a30f6d0ce1b0f1e")
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        uvIndex.innerText = 'UV Index ' + data['current']['uvi'];
        
    }).
    catch(err => alert('Error' + err))

}


function fiveDay(city){
    fetch ('https://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=imperial&APPID=f9d491be2c04cabd7a30f6d0ce1b0f1e')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var forecast = data.list;
        console.log(forecast)
        var HTMLText = ""
        for (let i = 0; i<forecast.length ; i=i+8) {
            //console.log(i)
            HTMLText += `<div class="card">
            <p>${forecast[i].dt_txt}</p>
            <p>${forecast[i].main.temp} degrees</p>
            <p>Wind speed: ${forecast[i].wind.speed} MPH</p>
            <p>Humidity: ${forecast[i].main.humidity}%</p>
            <br>
            <img src="https://openweathermap.org/img/wn/${forecast[i]['weather'][0]['icon']}@2x.png"/> </div>`
        }
        //console.log(HTMLText)
        document.querySelector(".display2").innerHTML = HTMLText
    })
}