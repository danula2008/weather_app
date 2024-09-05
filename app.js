let code_weather_details = "";

for (let i = 0; i < 9; i++) {
  code_weather_details += `
    <div class="col fw-medium">
        <div class="bg-black p-2 rounded-2 py-3">
            <p style="color: #7D7878; font-size: 15px;">Precipitation</p>
            <h6 class="fs-25">0.1 mm</h6>
        </div>
    </div>`;
}

document.getElementById("weather_details_grid").innerHTML =
  code_weather_details;

let code_hourly_forcast = "";

for (let i = 0; i < 24; i++) {
  code_hourly_forcast += `
    <div class="col">
        <h5 style="font-size: 20px;">${i < 10 ? "0" + i : i}:00</h4>
        <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" alt="Partly cloudy" height="45px" width="45px">
    </div>`;
}

document.getElementById("hourly_forcast_grid").innerHTML = code_hourly_forcast;
