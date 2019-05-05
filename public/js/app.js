console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                
                // console.log(data.weather);
                const current = data.weather.currently;
                const today = data.weather.daily.data[0];
                messageTwo.textContent = `Temperatuur: ${current.temperature}. Gevoelstemperatuur:${current.apparentTemperature}. Kans op regen: ${current.precipProbability * 100}% ${current.summary}. `
                messageTwo.textContent += `Min temp: ${today.temperatureLow}. Max temp: ${today.temperatureMax}`
            }
        });
    });
});

