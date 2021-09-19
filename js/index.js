



function getWeather(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = "https://api.openweathermap.org/data/2.5/";
    const weatherURL = `${url}weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    const weekURL = url + `forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    const timeURL = url + `onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    async function weatherDay() {
        await fetch(weatherURL)
            .then(res => {
                res.json().then(data => {
                    iconUrl = data.weather[0].icon
                    dayFn(data, "D")
                })
            })
            .catch(() => { alert("데이터 불러오기를 실패하셨습니다") })
    }
    async function weatherWeeks() {
        await fetch(timeURL)
            .then(res => {
                res.json().then(data => {
                    timeFn(data, "T")
                    weekFn(data, "W")
                })
            })
            .catch(() => { alert("데이터 불러오기를 실패하셨습니다") })
    }
    weatherDay()
    weatherWeeks()
    // fetch(weekURL)
    //     .then(res => {
    //         res.json().then(data => {
    //             layoutFn(data)
    //         })
    //     })
    //     .catch(() => { alert("데이터 불러오기를 실패하셨습니다") })

    // fetch(timeURL)
    //     .then(res => {
    //         res.json().then(data => {
    //             layoutFn(data)
    //         })
    //     })
    //     .catch(() => { alert("데이터 불러오기를 실패하셨습니다") })



}


navigator.geolocation.getCurrentPosition(getWeather)




function dayFn(data, type) {
    const icon = document.querySelector(".icon img")
    const dayIconImage = data.weather[0].icon;
    const dayIconUrl = `http://openweathermap.org/img/wn/${dayIconImage}@2x.png`
    const wind = document.querySelector(".main .wind span:nth-child(2)")
    const humidity = document.querySelector(".main .humidity span:nth-child(2)")
    const pressure = document.querySelector(".main .pressure span:nth-child(2)")
    const dayTemp = document.querySelector(".main .temp span:nth-child(2)")

    const windData = data.wind.speed;
    const humidityData = data.main.humidity;
    const pressureData = data.main.pressure;
    const dayTempDataMax = data.main.temp_max
    const dayTempDataMin = data.main.temp_min

    // layout
    wind.innerHTML = windData;
    humidity.innerHTML = humidityData;
    pressure.innerHTML = pressureData
    dayTemp.innerHTML = dayTempDataMax.toFixed() + "&nbsp;/&nbsp;" + dayTempDataMin.toFixed();
    icon.src = dayIconUrl;

}

function weekFn(data, type) {
    const weekList = document.querySelector('.week >.lists')
    for (let i = 1; i < data.daily.length; i++) {
        const weekIconImage = data.daily[i].weather[0].icon;
        const weekIconUrl = `http://openweathermap.org/img/wn/${weekIconImage}@2x.png`
        html = `
                  <li class="list">
                 <div>
                 <div class="icon">
                    <img src="${weekIconUrl}" alt="${data.daily[i].weather[0].main}">
                 </div>
                     <div class="date">
                         <span>${Unix_timestamp(data.daily[i].dt, 1)}</span>
                     </div>
                     <div class="temp">
                        <span>${data.daily[i].temp.day.toFixed() + "˚"}</span>
                     </div>
                 </div>
             </li>
      `
        //substring 뺴다 
        weekList.innerHTML += html
    }
}

function timeFn(data, type) {
    const hourlyList = document.querySelector('.hourly>.lists')
    console.log(data.hourly[0])
    for (let i = 0; i < 23; i++) {
        const hourlyIconImage = data.hourly[i].weather[0].icon;
        const hourlyIconImageIconUrl = `http://openweathermap.org/img/wn/${hourlyIconImage}@2x.png`

        if (i % 2 === 0) {
            html = `
                  <li class="list">
                 <div class="hourly-icon">
                    <img src="${hourlyIconImageIconUrl}" alt="${data.hourly[i].weather[0].main}">
                 </div>
                     <div class="hourly-time">
                         <span>${Unix_timestamp(data.hourly[i].dt, 2)}</span>
                     </div>
                     <div class="hourly-temp">
                        <span>${data.hourly[i].temp.toFixed() + "˚"}</span>
                     </div>
             </li>
      `
            hourlyList.innerHTML += html
        }

        //substring 뺴다 

    }
}