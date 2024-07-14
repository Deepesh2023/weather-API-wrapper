import express from "express";

const app = express();
const port = 3000;

app.get("/", (request, response) => response.send("<h1>Hello world</h1>"));

app.listen(port, () => console.log("server started"));
