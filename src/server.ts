import "reflect-metadata";
import express from "express";
import { routes } from "./routes";
import { AppDataSource } from "./database/AppDataSource";

const app = express();

app.use(express.json());

app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Server connected to the database");
  })
  .catch((err) => {
    console.error("Unable to connect to database: ", err);
  });

app.listen(8888, () => console.log("Server is running"));
