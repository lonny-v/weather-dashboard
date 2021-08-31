var button = document.querySelector('.button');
var name = document.getElementById('name');
var temp = document.getElementById('temp');
var desc = document.getElementById('desc');

button.addEventListener('click', function(){
    
var inputValue = document.getElementById('inputValue').value;
console.log(inputValue);
    fetch ('http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&APPID=f9d491be2c04cabd7a30f6d0ce1b0f1e')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var descValue = data['weather'][0]['description'];

        name.innerHTML = nameValue;
        temp.innerHTML = tempValue;
        desc.innerHTML = descValue;
        
    })

    .catch(err => alert('Enter a valid city'))
})

