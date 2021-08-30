// f9d491be2c04cabd7a30f6d0ce1b0f1e

// 51.45745669733949, -2.587752074448693

// https://api.openweathermap.org/data/2.5/onecall?lat=51.45745669733949&lon=-2.587752074448693&exclude=current,minutely,hourly,alerts&appid=a04344321243f7367f58760b622ced8d



var btn = document.getElementById('.btn');
var formInput = document.getElementById('.formInput');
var city = document.getElementById('#city');
var desc = document.getElementById('.desc');
var temp = document.getElementById('.temp');

btn.addEventListener('click', function(){
    fetch ('http://api.openweathermap.org/data/2.5/weather?q='
    +formInput.value+'&units=imperial&APPID=f9d491be2c04cabd7a30f6d0ce1b0f1e')
    .then(response => response.json())
    .then(data => console.log(data))

    .catch(err => alert('Enter a valid city'))
})
