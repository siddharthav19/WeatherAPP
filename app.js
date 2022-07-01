//app.js file 
//EnglishName == CityName 
//WeatherText == weather Type



















const form = document.querySelector('form');

const details = document.querySelector('.details');

const card = document.querySelector('.card');

const spinner = document.querySelector('.spin--up');

const time = document.querySelector('img.time');

const icon = document.querySelector('.iconsimage');


const updateUi = (data)=>{

     const { cityDetails , weatherDetails } = data;     

     spinner.classList.add('hide');

     details.innerHTML = `
     
     <div class="text-muted text-uppercase text-center details">
          <h5 class="my-3">${cityDetails.EnglishName}</h5>           
          <div class="my-3">${weatherDetails.WeatherText}</div>
          <div class="display-4 my-4">
               <span>${weatherDetails.Temperature.Metric.Value}</span>
               <span>&deg;C</span>
          </div>
     </div>

     `
    

     if(weatherDetails.IsDayTime===true)
     {
          time.setAttribute('src','day.svg');

     }
     else{

          time.setAttribute('src','night.svg');
     }

     let picNumber =data.weatherDetails.WeatherIcon;

     let result = `icons/${picNumber}.svg`;

     icon.setAttribute('src',result);

     if(card.classList.contains('hide'))
     {
          card.classList.remove('hide');

     }
     
     window.scrollTo(0,200);


};

const updateCity = async (cityName)=>{

     const cityDetails = await getCityId(cityName);

     const weatherDetails = await getWeather(cityDetails.Key);

     return { cityDetails, weatherDetails }; 

};


if(localStorage.length!==0)
{
     let cityName = localStorage.getItem('locationName');

     updateCity(cityName).then((data)=>{

          updateUi(data);

     }).catch((err)=>{

          alert('Error ',err);

          window.location.reload();

      
     });
}





form.addEventListener('submit',(e)=>{

     e.preventDefault();

     spinner.classList.remove('hide');

     const city = form.city.value.trim().toLowerCase();

     let sendingData = city.toUpperCase();

     localStorage.setItem('locationName',sendingData);

     form.reset();

     updateCity(city)

     .then((data)=>{

          updateUi(data);

     })
     
     .catch((err)=>{

          alert('Error ',err);

          window.location.reload();

      
     });

});
