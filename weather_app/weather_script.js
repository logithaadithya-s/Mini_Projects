const w_form=document.querySelector(".main-form");
const city_input=document.querySelector(".city-inp");
const card=document.querySelector(".card");
const apiKey="4f0ca0f782141ac12305aea9c3aa24a7";

w_form.addEventListener("submit",async (event)=>{
    event.preventDefault();
    const city=city_input.value;
    if(city){
        try{
            const weather=await getWeatherData(city);
            displayWeather(weather);
        }catch(error){
            console.log(error);
            displayError(error);
        }
    }else{
        displayError("Please Enter a city");
    }
});
function displayError(message){
    card.textContent="";
    const errorDisp=document.createElement("p");
    errorDisp.textContent=message;
    errorDisp.classList.add("descDisp");
    card.appendChild(errorDisp);
}
async function getWeatherData(city){
    try{
        const dat=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if(!dat.ok){
            throw new Error("Could not fetch the weather data");
        }
        return await dat.json();
    }catch(error){
        console.log(error);
        displayError(error);
    }
}
function displayWeather(dat){
    console.log(dat);
    const {name: city,
            main:{temp,humidity},
            weather:[{description,id}]}
         = dat;
    card.textContent="";
    const city_disp=document.createElement("h1");
    city_disp.textContent=city;
    city_disp.classList.add("citydisp");
    card.appendChild(city_disp);

    const temp_disp=document.createElement("p");
    temp_disp.textContent=`${(Number(temp)-273.15).toFixed(1)}°C`;
    temp_disp.classList.add("temp");
    card.appendChild(temp_disp);

    const humdiity_disp=document.createElement("p");
    humdiity_disp.textContent=`Humidity: ${humidity}%`;
    humdiity_disp.classList.add("humidity");
    card.appendChild(humdiity_disp);

    const desc_disp=document.createElement("p");
    desc_disp.textContent=description;
    desc_disp.classList.add("descDisp");
    card.appendChild(desc_disp);
    
    const emoj=document.createElement("p");
    emoj.textContent=emojiFinder(id);
    emoj.classList.add("Weather");
    card.appendChild(emoj);
}
function emojiFinder(id){
    switch(true){
        case (id>=200 && id<300):
            return "⛈️";
        case (id>=300 && id<400):
            return "🌩️";
        case (id>=500 && id<600):
            return "";
    }
}