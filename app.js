let code_hourly_forcast = "";

for (let i = 0; i < 24; i++) {
  code_hourly_forcast += `
    <div class="col">
        <h5 style="font-size: 20px;">${i < 10 ? "0" + i : i}:00</h4>
        <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" alt="Partly cloudy" height="45px" width="45px">
    </div>`;
}

document.getElementById("hourly_forcast_grid").innerHTML = code_hourly_forcast;

document.getElementById("datePicker").value = new Date()
  .toISOString()
  .slice(0, 10);

// -----------------------------------------------------------------------------------

fetch(
  "https://api.weatherapi.com/v1/current.json?q=sri-lanka&key=ead3f37c992946bb943145314240609"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    setData(data)
  })
  .catch((error) => console.error("Error:", error));


function setData(data){
  document.getElementById("name_region").innerText = data.location.name + ", " + data.location.country;
  document.getElementById("latitude").innerText = "Latitude: " + data.location.lat + "°N";
  document.getElementById("longitude").innerText = "Longitude: " + data.location.lon + "°W";
  document.getElementById("last_updated").innerText = "Last update: " + data.current.last_updated;
  document.getElementById("temp").innerText = data.current.temp_c + "°C";
  document.getElementById("condition_txt").innerText = data.current.condition.text;
  document.getElementById("condition_icon").src = "https:" + data.current.condition.icon;
  document.getElementById("condition_icon").alt = data.current.condition.text;
  document.getElementById("cloud").innerText = "Cloud: " + data.current.cloud + "%";
  document.getElementById("wind_dir").innerText = "Wind direction: " + data.current.wind_dir;

  setWeatherDetails([
    [
      "Feels Like",
      data.current.feelslike_c + "°C"
    ],
    [
      "Wind Speed",
      data.current.wind_kph + " km/h"
    ],
    [
      "Humidity",
      data.current.humidity + "%"
    ],
    [
      "UV",
      data.current.uv
    ],
    [
      "Visibility",
      data.current.vis_km + " km"
    ],
    [
      "Pressure",
      data.current.pressure_mb + " mb"
    ],
    [
      "Precipitation",
      data.current.precip_mm + " mm"
    ],
    [
      "Gusts",
      data.current.gust_kph + " km/h"
    ],
    [
      "Dew Point",
      data.current.dewpoint_c + "°C"
    ],
  ])
}

function setWeatherDetails(data){
  let code_weather_details = "";

for (let i = 0; i < data.length; i++) {
  code_weather_details += `
    <div class="col fw-medium">
        <div class="bg-black p-2 rounded-2 py-3">
            <p style="color: #7D7878; font-size: 15px;">${data[i][0]}</p>
            <h6 class="fs-25">${data[i][1]}</h6>
        </div>
    </div>`;
}

document.getElementById("weather_details_grid").innerHTML =
  code_weather_details;
}