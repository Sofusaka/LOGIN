import express, { json } from "express";
import {router} from "./routes/routes.js";
import cors from "cors"; 
import http from "http";
import path from 'path';
import { fileURLToPath } from 'url';


import { APP_PORT, APP_HOST } from "./config.js";

export const app = express(); 
app.use(json());
app.disable("x-powered-by");

//permite conexiones de cualquier url
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/", router);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/static', express.static(path.join(__dirname, 'public')));

// error 404 (no encontrado)
app.use(function (req, res, next) {
  res.status(404).send('not found!!')
});



http.createServer(app).listen(APP_PORT);
console.log("Server on port", APP_HOST, APP_PORT);
