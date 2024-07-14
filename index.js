import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.json());
app.get("/", async (request, response) => {
  const weatherData = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=${process.env.WEATHER_API_KEY}`
  );

  response.json(weatherData.data);
});

app.listen(port, () => console.log("server started"));
