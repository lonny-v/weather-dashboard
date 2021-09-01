var button = document.querySelector('.button');
var city = document.getElementById('name');
var temp = document.getElementById('temp');
var desc = document.getElementById('desc');
var windSpeed = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');
var img = document.getElementById('img');


button.addEventListener('click', function(){
    
var inputValue = document.getElementById('inputValue').value;
console.log(inputValue);
    fetch ('https://api.openweathermap.org/data/2.5/weather?q='+inputValue+'&units=imperial&APPID=f9d491be2c04cabd7a30f6d0ce1b0f1e')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var descValue = data['weather'][0]['description'];
        console.log(nameValue,tempValue)
        city.innerText = "City" + nameValue;
        temp.innerText = "Temp : "+tempValue;
        desc.innerText = descValue;
        windSpeed.innerText = data['wind']['speed'];
        img.setAttribute("src", `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        displayUvIndex(lat, lon)
    })

    .catch(err => alert('Error' + err))
})

function displayUvIndex (lat, lon) {
    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&APPID=f9d491be2c04cabd7a30f6d0ce1b0f1e")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        uvIndex.innerText = 'UV Index ' + data['current']['uvi'];
    }).
    catch(err => alert('Error' + err))

}


