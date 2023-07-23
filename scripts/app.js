
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


//getting city info
const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const  weatherDetails = await getWeather(cityDetails.Key);
    return {cityDetails, weatherDetails};
};


//updating UI
const updateUI = (data) => {
    const {cityDetails, weatherDetails} = data;

    details.innerHTML = `
                <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <h5 class="my-3">${cityDetails.Country.EnglishName}</h5>
                <div class="my-3">${weatherDetails.WeatherText}</div>
                <div class="display-4 my-4">
                 <span>${weatherDetails.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    `;

    //setting icon img
    let iconSource = `img/icons/${weatherDetails.WeatherIcon}.svg`;

    icon.setAttribute('src', iconSource);


    //setting background img
    let timeSource = weatherDetails.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSource);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

cityForm.addEventListener('submit', event=>{
    event.preventDefault();

    //getting the input-value
    const city = cityForm.city.value.trim();

    //clearing the input
    cityForm.reset();

    updateCity(city).then(data=>updateUI(data)).catch(err=>err);
});

