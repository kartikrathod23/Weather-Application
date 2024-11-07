let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_minTemp = document.querySelector(".weather_min");
let w_maxTemp= document.querySelector(".weather_max");
let w_temp = document.querySelector(".weather_temperature");

let w_feelsLike=document.querySelector(".weather_feelsLike");
let humidity = document.querySelector(".weather_humidity")
let wind = document.querySelector(".weather_wind");
let pressure = document.querySelector(".weather_pressure")

let area="jalna";

let citySearch = document.querySelector(".weather_search").addEventListener('submit',(e)=>{
    e.preventDefault();
    let city= document.querySelector("#city_name")
    area=city.value;
    getWeatherData();
    city.value="";

})

const getCountryName=(code)=>{
    const regionNamesInEnglish = new Intl.DisplayNames([code], { type: 'region' });
    return regionNamesInEnglish.of(code);
}

const getDateTime=(dt)=>{
    const curDate = new Date(dt*1000);

    const options={
        weekday:"long",
        year:'numeric',
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric"
    };
    const formatter=new Intl.DateTimeFormat("en-US",options);
    return formatter.format(curDate);
}

const getWeatherData= async()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${area}&APPID=f9059ed3aed75eb540bfda2556c6daab`
    try{
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data)
        const {main,name,weather,wind,sys,dt}=data;

        cityName.innerHTML = `${name},${getCountryName(sys.country)}`;    
        // console.log(new Date(dt*1000))
        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML=weather[0].main;
        w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png">`

        w_temp.innerHTML=`${main.temp}&#176`;
        w_minTemp.innerHTML=`Min: ${main.temp_min.toFixed()}&#176`;
        w_maxTemp.innerHTML=`Max: ${main.temp_max.toFixed()}&#176`;

        w_feelsLike.innerHTML=`${main.feels_like.toFixed(2)}&#176`;
        humidity.innerHTML=`${main.humidity}%`;
        wind.innerHTML=`${wind.innerHTML}m/s`;
        
        pressure.innerHTML=`${main.pressure}hPa`;
    } catch(error){
        cityName.innerHTML="cannot fetch data";
    }
};
window.addEventListener("load",getWeatherData())
// f9059ed3aed75eb540bfda2556c6daab