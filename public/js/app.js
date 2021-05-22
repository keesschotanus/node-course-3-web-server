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
                const current = data.weather.current;
                messageTwo.textContent = `Temperature: ${current.temperature}. Feels like: ${current.feelslike}. Humidity: ${current.humidity}% ${current.weather_descriptions[0]}. `
            }
        });
    });
});

