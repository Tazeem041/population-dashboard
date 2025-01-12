import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Bar, Pie, Line } from "react-chartjs-2";
import "./index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const csvUrl =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Electric_Vehicle_Population_Data-kPoJNFb5ZABQjj91Thy5rTHKCAJf3k.csv";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  const vehicleTypeData = {
    labels: ["BEV", "PHEV"],
    datasets: [
      {
        data: [
          data.filter(
            (item) =>
              item["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)"
          ).length,
          data.filter(
            (item) =>
              item["Electric Vehicle Type"] ===
              "Plug-in Hybrid Electric Vehicle (PHEV)"
          ).length,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  const topMakesData = {
    labels: ["TESLA", "NISSAN", "CHEVROLET", "TOYOTA", "BMW"],
    datasets: [
      {
        label: "Number of Vehicles",
        data: [
          data.filter((item) => item.Make === "TESLA").length,
          data.filter((item) => item.Make === "NISSAN").length,
          data.filter((item) => item.Make === "CHEVROLET").length,
          data.filter((item) => item.Make === "TOYOTA").length,
          data.filter((item) => item.Make === "BMW").length,
        ],
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const modelYearData = {
    labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
    datasets: [
      {
        label: "Number of Vehicles",
        data: [
          data.filter((item) => item["Model Year"] === "2015").length,
          data.filter((item) => item["Model Year"] === "2016").length,
          data.filter((item) => item["Model Year"] === "2017").length,
          data.filter((item) => item["Model Year"] === "2018").length,
          data.filter((item) => item["Model Year"] === "2019").length,
          data.filter((item) => item["Model Year"] === "2020").length,
          data.filter((item) => item["Model Year"] === "2021").length,
        ],
        borderColor: "#FF6384",
        fill: false,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Electric Vehicle Population Dashboard</h1>
      <div className="chart-container">
        <div className="chart">
          <h2>Vehicle Types</h2>
          <Pie data={vehicleTypeData} />
        </div>
        <div className="chart">
          <h2>Top 5 Makes</h2>
          <Bar data={topMakesData} />
        </div>
        <div className="chart">
          <h2>Vehicles by Model Year</h2>
          <Line data={modelYearData} />
        </div>
      </div>
    </div>
  );
}

export default App;
