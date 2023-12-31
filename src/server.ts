import "reflect-metadata";
import { app } from "./app";
import { connect } from "./database/connect";
import dotenv from "dotenv";

dotenv.config();

connect().then(() => {
  app.listen(process.env.PORT, () => console.log("Server is running"));
});
