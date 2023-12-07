import "reflect-metadata";
import { AppDataSource } from "./database/AppDataSource";
import { app } from "./app";
require("dotenv").config();

AppDataSource.initialize()
  .then(() => {
    console.log("Server connected to the database");
  })
  .catch((err) => {
    console.error("Unable to connect to database: ", err);
  });

app.listen(process.env.PORT, () => console.log("Server is running"));
