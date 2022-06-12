const form = document.querySelector('form');

const details = document.querySelector('.details');

const card = document.querySelector('.card');

const spinner = document.querySelector('.spin--up');

const time = document.querySelector('img.time');

const icon = document.querySelector('.iconsimage');


const updateUi = (data)=>{


     //With Normal local variables 

     /*

      const cityDetails = data.cityDetails;

     const weatherDetails = data.weatherDetails; 
     
     */

     // with Destructuring Property 

     const { cityDetails , weatherDetails } = data;     //the names inside the {} should be same as of the names of the properties of data object then only we can use destructuring property


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
     // we can also do it like data.cityDetails.EnglishName instead of cityDetails.EnglishName

     if(weatherDetails.IsDayTime===true)
     {
          time.setAttribute('src','img/day.svg');

     }
     else{

          time.setAttribute('src','img/night.svg');
     }

     let picNumber =data.weatherDetails.WeatherIcon;

     let result = `img/icons/${picNumber}.svg`;

     icon.setAttribute('src',result);

     if(card.classList.contains('hide'))
     {
          card.classList.remove('hide');

     }


};

const updateCity = async (cityName)=>{

     const cityDetails = await getCityId(cityName);

     const weatherDetails = await getWeather(cityDetails.Key);

     console.log(cityDetails);
     console.log(weatherDetails);

     // return {
     //      cityDetails : cityDetails,
     //      weatherDetails : weatherDetails
     // };

     return { cityDetails, weatherDetails }; 
     
     // object shorthand notation when the property's look/(name) is same as it's value look/(name);

};


form.addEventListener('submit',(e)=>{

     e.preventDefault();

     spinner.classList.remove('hide');

     const city = form.city.value.trim().toLowerCase();

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