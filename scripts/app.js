const card=document.querySelector('.card');
const details=document.querySelector('.details');
const cityForm=document.querySelector('form');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');
const forecast=new Forecast();

// console.log(forecast);
const updateUI=data=>{
    const cityDets=data.cityDets;
    const weather=data.weather;
    console.log(cityDets);
    details.innerHTML=`
         <h5 class="my-3">
                    ${cityDets.EnglishName}
                </h5>
                <div class="my-3">
                   ${weather.WeatherText}
                </div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    `;

    const iconsrc=`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconsrc);

    
    let timesrc=null;
    if(weather.IsDayTime){
        timesrc='img/day.svg';
    }
    else{
        timesrc='img/night.svg';
    }

    time.setAttribute('src',timesrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}



cityForm.addEventListener('submit',e=>{
    e.preventDefault();
    const city=cityForm.city.value.trim();
    cityForm.reset();
    forecast.updateCity(city).then(data=>{
        // console.log(data);
      updateUI(data);

      
    }).catch(err=>{

        console.log(err);
    });
    localStorage.setItem('city',city);
});


if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city')).then(data=>{
        // console.log(data);
      updateUI(data);
    }).catch(err=>{
        console.log(err);
    });
}