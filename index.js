import express from "express";
import axios from "axios";
import { createClient } from "redis";
import "dotenv/config";

const app = express();
const port = 3000;

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

app.use(express.json());

app.post("/", async (request, response) => {
  const location = request.body.location.replace(" ", "");

  const weatherData = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}`
  );

  const weather = {
    location: weatherData.data.resolvedAddress,
    temperature: weatherData.data.currentConditions.temp,
    descripiton: weatherData.data.description,
  };

  response.json(weather);
});

app.listen(port, () => console.log("server started"));
