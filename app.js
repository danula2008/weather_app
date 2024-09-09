getDataFromApi();

async function getDataFromApi() {
  fetch(
    "https://api.weatherapi.com/v1/forecast.json?q=rajanganaya&key=ead3f37c992946bb943145314240609"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setLocation(data.location);
      setData(data.current);
      setAstroDetails(data.forecast.forecastday[0].astro);
      setForcast(data.forecast.forecastday[0].hour);
    })
    .catch((error) => console.error("Error:", error));
}

function setData(data) {
  document.getElementById("last_updated").innerText =
    "Last update: " + data.last_updated;
  document.getElementById("temp").innerText = data.temp_c + "°C";
  document.getElementById("condition_txt").innerText = data.condition.text;
  document.getElementById("condition_icon").src =
    "https:" + data.condition.icon;
  document.getElementById("condition_icon").alt = data.condition.text;
  document.getElementById("cloud").innerText = "Cloud: " + data.cloud + "%";
  document.getElementById("wind_dir").innerText =
    "Wind direction: " + data.wind_dir;

  setWeatherDetails([
    ["Feels Like", data.feelslike_c + "°C"],
    ["Wind Speed", data.wind_kph + " km/h"],
    ["Humidity", data.humidity + "%"],
    ["UV", data.uv],
    ["Visibility", data.vis_km + " km"],
    ["Pressure", data.pressure_mb + " mb"],
    ["Precipitation", data.precip_mm + " mm"],
    ["Gusts", data.gust_kph + " km/h"],
    ["Dew Point", data.dewpoint_c + "°C"],
  ]);
}

function setWeatherDetails(data) {
  let code_weather_details = "";

  for (const element of data) {
    code_weather_details += `
    <div class="col fw-medium">
        <div class="bg-black p-2 rounded-2 py-3">
            <p style="color: #7D7878; font-size: 15px;">${element[0]}</p>
            <h6 class="fs-25">${element[1]}</h6>
        </div>
    </div>`;
  }

  document.getElementById("weather_details_grid").innerHTML =
    code_weather_details;
}

function setAstroDetails(data) {
  let code_astro_details = "";

  let headings = [
    "Sunrise",
    "Sunset",
    "Moon Rise",
    "Moon Set",
    "Moon Phase",
    "Moon Light",
  ];
  let values = [
    data.sunrise,
    data.sunset,
    data.moonrise,
    data.moonset,
    data.moon_phase,
    data.moon_illumination,
  ];

  for (let i = 0; i < headings.length; i++) {
    code_astro_details += `
    <div class="col-6 col-md-4 col-lg-2 mt-lg-0 mt-sm-2 mt-3">
        <div class="w-100 d-flex flex-column align-items-center bg-black p-3 rounded-2 py-4">
            <p style="color: #7D7878; font-size: 15px;">${headings[i]}</p>
            <h6 style="${
              headings[i] === "Moon Phase"
                ? "font-size: 15px;"
                : "font-size: 25px;"
            }">${headings[i] === "Moon Light" ? values[i] + '%' : values[i]}</h6>
        </div>
    </div>`;
  }

  document.getElementById("astro_details_grid").innerHTML = code_astro_details;
}

function setLocation(data) {
  document.getElementById("name_region").innerText =
    data.name + ", " + data.country;
  document.getElementById("latitude").innerText =
    "Latitude: " + data.lat + "°N";
  document.getElementById("longitude").innerText =
    "Longitude: " + data.lon + "°W";
}

function setForcast(data) {
  let code_hourly_forcast = "";

  let rainDataAr = [];
  let tempDataAr = [];
  let feelTempAr = [];
  let timeStampsAr = [];

  data.forEach((hforcast) => {
    code_hourly_forcast += `
    <div class="col">
        <h5 style="font-size: 20px;">${hforcast.time.slice(11)}</h4>
        <img src='${"https:" + hforcast.condition.icon}' alt="${
      hforcast.condition.text
    }" height="45px" width="45px">
    </div>`;

    rainDataAr[rainDataAr.length] = hforcast.chance_of_rain;
    tempDataAr[tempDataAr.length] = hforcast.temp_c;
    feelTempAr[feelTempAr.length] = hforcast.feelslike_c;
    timeStampsAr[timeStampsAr.length] = hforcast.time.slice(11);
  });

  createChart(rainDataAr, tempDataAr, feelTempAr, timeStampsAr);

  document.getElementById("hourly_forcast_grid").innerHTML =
    code_hourly_forcast;
}

// -----------------------------------   C   H   A   R   T   S   -------------------------------------------

function createChart(rainData, trueTemp, feelTemp, timeStamps) {
  const rainChartProperties = {
    labels: timeStamps,
    datasets: [
      {
        label: "Chance of Rain (%)",
        data: rainData,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const tempChartProperties = {
    labels: timeStamps,
    datasets: [
      {
        label: "Hourly Temperature (°C)",
        data: trueTemp,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Feels Like Temperature (°C)",
        data: feelTemp,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        pointHoverBackgroundColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const verticalhoverLine = {
    id: "verticalhoverLine",
    beforeDatasetsDraw(chart, args, plugins) {
      const {
        ctx,
        chartArea: { top, bottom },
      } = chart;

      ctx.save();

      // Loop through all datasets to check for active data points
      chart.getDatasetMeta(0).data.forEach((dataPoint) => {
        if (dataPoint.active === true) {
          // Draw the vertical line at the active data point's x position
          ctx.beginPath();
          ctx.strokeStyle = "gray";
          ctx.moveTo(dataPoint.x, top);
          ctx.lineTo(dataPoint.x, bottom);
          ctx.stroke();
        }
      });

      ctx.restore();
    },
  };

  new Chart(document.getElementById("rainfallChart"), {
    type: "line",
    data: rainChartProperties,
    options: {
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
    plugins: [verticalhoverLine],
  });

  new Chart(document.getElementById("temperatureChart"), {
    type: "line",
    data: tempChartProperties,
    options: {
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
    plugins: [verticalhoverLine],
  });
}
