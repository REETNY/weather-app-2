const tempDeg = document.querySelector(".tempDeg");
const searchedState = document.querySelector(".searchedState");

const currTime = document.querySelector(".currTime");
const divisor = document.querySelector(".divisor");
const weekday = document.querySelector(".weekday");
const weekDate = document.querySelector(".weekDate");
const month = document.querySelector(".month");
const year = document.querySelector(".year");

const img = document.querySelector(".img");
const condition = document.querySelector(".condition");

const form = document.querySelector(".form");
const textbox = document.querySelector(".textbox");
const submit = document.querySelector(".submit");

const eachLocate = [...document.querySelectorAll(".locate")];

const cloudyPercent = document.querySelector(".cloudyPercent");
const humidPercent = document.querySelector(".humidPercent");
const windPercent = document.querySelector(".windPercent");
const windDegree = document.querySelector(".windDegree");
const directionPoint = document.querySelector(".directionPoint");
const lonMag = document.querySelector(".lonMag");
const latMag = document.querySelector(".latMag");
const area = document.querySelector(".area");
const myCountry = document.querySelector("#country");

const container = document.querySelector(".app-body");

const secondSection = document.querySelector(".second-section");


let APIURL = `https://api.weatherapi.com/v1/current.json?key=`; // updated
let APIKEY = `aaa5eb12cbca42e6b9385412223012`;

async function weatherDetails(location){
    try{
        let serverResponse = await fetch(`${APIURL}+${APIKEY}&q=${location}`);
        let resp = await serverResponse.json();
        return resp;
    }catch(err){
        console.log(err)
    }
}

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

let cloudyCodes = [];
let clearyCodes = [];
let rainyCodes = [];
let snowyCodes = [];
let mistyCodes = [];
let blizzardCodes = [];

async function getConditionCode(){
    let serverResponse = await fetch(`https://www.weatherapi.com/docs/weather_conditions.json`);
    let resp = await serverResponse.json();
    console.log(resp)
    resp.forEach( (item) => {
        if(item.day.includes("Sunny") || item.day.includes("Clear") || item.day.includes("clear")){
            clearyCodes.push(item.code);
        }if(item.day.includes("rain") || item.day.includes("drizzle") || item.day.includes("sleet")){
            rainyCodes.push(item.code)
        }if(item.day.includes("cloudy") || item.day.includes("Cloudy")){
            cloudyCodes.push(item.code);
        }if(item.day.includes("snow") || item.day.includes("ice") || item.day.includes("Ice")){
            snowyCodes.push(item.code)
        }if(item.day.includes("Mist") || item.day.includes("Fog") || item.day.includes("Overcast")){
            mistyCodes.push(item.code)
        }if(item.day.includes("Blizzard")){
            blizzardCodes.push(item.code)
        }
    })

}

function showDetails(rawData){

    let data = rawData;

    let continent;

    let {wind_mph, humidity, is_day, temp_c, temp_f, wind_degree, wind_dir, cloud} = rawData.current;

    let {text, icon, code} = rawData.current.condition;

    let {country, lat, lon, localtime, name, region, tz_id} = rawData.location;

    console.log(rawData)

    let imgUrl = "";
    let imgType;

    cloudyCodes.forEach((num) => {
        if(num === code){
            imgType = "cloudy";
            return;
        }
    })

    clearyCodes.forEach( (num) => {
        if(num === code){
            imgType = "clear";
            return
        }
    })

    mistyCodes.forEach( (num) => {
        if(num === code){
            imgType = "mist";
            return
        }
    })

    rainyCodes.forEach( (num) => {
        if(num == code){
            imgType = "rainy";
            return
        }
    })

    snowyCodes.forEach( (num) => {
        if(num == code){
            imgType = "snowy";
            return
        }
    })

    blizzardCodes.forEach( (num) => {
        if(num == code){
            imgType = "blizzard";
            return
        }
    })


    if(is_day == 1){
        secondSection.style.background = `rgba(24, 24, 24, 0.4)`;
        imgUrl = `/images/day/`;
        submit.style.background = `rgb(252, 229, 112,.9)`
        container.style.background = `url(${imgUrl}${imgType}.jpg)`;
        container.style.backgroundSize = `cover`;
        container.style.backgroundRepeat = `no-repeat`;
        container.style.backgroundPosition = `center center`;
    }else{
        secondSection.style.background = `rgba(255, 255, 255, 0.2)`;
        imgUrl = `/images/night/`;
        submit.style.background = `rgb(19,24,98,.8)`
        container.style.background = `url(${imgUrl}${imgType}.jpg)`;
        container.style.backgroundSize = `cover`;
        container.style.backgroundRepeat = `no-repeat`;
        container.style.backgroundPosition = `center center`;
    }

    tempDeg.innerText = `${Math.floor(temp_c)}°C`;
    searchedState.innerText = `${name}`;
    currTime.textContent = `${localtime.substr(10)}`;
    divisor.textContent = `-`;
    condition.textContent = `${text}`;

    humidPercent.textContent = `${humidity}%`;
    windPercent.textContent = `${wind_mph}mph`;
    cloudyPercent.textContent = `${cloud}%`;
    directionPoint.textContent = `${wind_dir}`;
    windDegree.textContent = `${wind_degree}`;
    lonMag.textContent = `${lon}`;
    latMag.textContent = `${lat}`;

    let abbrevArr = [];
    let indez;
    let newCountry = "";

    if(country.length > 14){
        if(country.includes("of")){
            abbrevArr = country.split(" ");
            
            abbrevArr.forEach( (word, index) => {
                if(word == "of"){
                    indez = index;
                }
            })

            abbrevArr.splice(indez, 1);

            for(let i = 0; i < abbrevArr.length; i++){
                if(abbrevArr.length - i == 1){
                    newCountry += `${abbrevArr[i].charAt(0)}`;
                }else{
                    newCountry += `${abbrevArr[i].charAt(0)}.`;
                }
            }
        }else{
            abbrevArr = country.split(" ");
            for(let i = 0; i < abbrevArr.length; i++){
                if(abbrevArr.length - i == 1){
                    newCountry += `${abbrevArr[i].charAt(0)}`;
                }else{
                    newCountry += `${abbrevArr[i].charAt(0)}.`;
                }
            }
        }
    }

    myCountry.textContent = `${newCountry == "" ? country : newCountry}`;

    if(tz_id.includes("/")){
        let index = (tz_id.indexOf("/"));
        continent = tz_id.substr(0,index);
    }
    area.textContent = `${continent}`
    img.src = `${icon}`;
    img.style.display = `block`;

    year.innerText = `${localtime.substr(0,4)}`;
    month.innerText = `${localtime.substr(5,2)}`;
    weekDate.textContent = `${localtime.substring(8,10)},`;
    weekday.textContent = `${weekDays[getDay(localtime.substring(0,10))]}`;

}

function getDay(data){
    let day = new Date(data).getDay();
    return day;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
})

submit.addEventListener("click", () => {
    removeActive();
    let userInput = textbox.value;
    weatherDetails(userInput).then( (data) => {
        showDetails(data);
    })
    textbox.value = "";
})

eachLocate.forEach( (location) => {
    location.classList.remove("active");
    location.addEventListener("click", (e) => {
        removeActive();
        let userChoice = e.target.textContent;
        weatherDetails(userChoice).then( (data) => {
            showDetails(data);
        })
        e.target.classList.add("active");
    })
})

function removeActive() {
    for(let i = 0; i < eachLocate.length; i++){
        eachLocate[i].classList.remove("active");
    }
}


// on window loading

let lattitude;
let longitude;

let GEOCODINGKEY = `64336cfdc95e4fb58d5e897eacc762bd`;

window.onload = () => {
    
    getConditionCode().then( (codes) => {
        console.log(cloudyCodes)
        getCoOrdinate();
    })

    

    
}

function getCoOrdinate(){
    navigator.geolocation.getCurrentPosition((position) => {
        lattitude = position.coords.latitude;
        longitude = position.coords.longitude;

        if(lattitude !== "" || lattitude !== undefined){
            getLocation(lattitude, longitude)
        }else{
            return
        }
        
    })
}

async function getLocation(lattitude, longitude){
    let serverResponse = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lattitude}+${longitude}&key=${GEOCODINGKEY}`);
    let resp = await serverResponse.json();
    let response = resp.results[0];
    let {name} = response.annotations.timezone;
    let stateArr = name.split("/");
    let myState = stateArr[1];
    
    weatherDetails(myState).then( (data) => {
        showDetails(data);
    })
}

