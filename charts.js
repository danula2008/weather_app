const label = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const rainData = {
  labels: label,
  datasets: [
    {
      label: "Chance of Rain (%)",
      data: [
        10, 20, 15, 5, 0, 0, 0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 55, 60, 65,
        70, 75, 80, 85, 90,
      ],
      // Replace with your actual chance of rain data for each hour
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

const tempData = {
  labels: label,
  datasets: [
    {
      label: "Hourly Temperature (°C)",
      data: [
        15.2, 14.8, 14.5, 14.2, 13.9, 13.5, 13.0, 13.5, 14.8, 16.3, 
        18.0, 19.5, 21.0, 22.2, 23.5, 24.1, 23.8, 22.5, 21.0, 19.5, 
        18.0, 16.8, 15.5, 15.0
      ], // Replace with your actual hourly temperature data
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Feels Like Temperature (°C)",
      data: [
        13.5, 13.2, 13.0, 12.8, 12.5, 12.3, 12.1, 12.9, 14.0, 15.7, 
        17.3, 18.8, 20.5, 21.8, 23.0, 23.6, 23.2, 21.9, 20.5, 19.0, 
        17.8, 16.5, 15.3, 14.8
      ], // Replace with your actual feels like temperature data
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
    data: rainData,
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
    data: tempData,
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
