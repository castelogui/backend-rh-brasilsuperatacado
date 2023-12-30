import "reflect-metadata";
import { app } from "./app";
import { connect } from "./database/connect";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3333;

connect().then(() => {
  app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
});
