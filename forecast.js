// vzQATewT8MJMuRhMCXQyiVh8AE3PSwGu

const key = 'vzQATewT8MJMuRhMCXQyiVh8AE3PSwGu';

const getWeather = async (cityId)=>{

     const baseVal = `http://dataservice.accuweather.com/currentconditions/v1/`;

     const idWithQuery = `${cityId}?apikey=${key}`;

     const resp1 = await fetch(baseVal+idWithQuery);

     if(resp1.status!==200)
     {

          throw new Error('Error in grabbing the weather information');
     }

     const resp2 = await resp1.json();

     // console.log(resp2);   

     return resp2[0];
}




const getCityId = async (city) => {

     const baseVal = 'http://dataservice.accuweather.com/locations/v1/cities/search';

     const query = `?apikey=${key}&q=${city}`;

     const resp1 = await fetch(baseVal + query);

     if (resp1.status !== 200) {

          throw new Error('Error in getting the City Details');
     }

     const resp2 = await resp1.json();


     return resp2[0];   //returning the first object in the array but still it's a promise


};





// getCityId('manchester').then((data) => {

//      // console.log(data);

//      const cityId = data.Key;

//      return getWeather(cityId);


// })
// .then((WeatherData)=>{

//      console.log(WeatherData);

// })
// .catch((err) => {

//      window.alert('Error ', err);

//      window.location.reload();

// });