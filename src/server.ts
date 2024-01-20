import "reflect-metadata";
import { app } from "./app";
import "dotenv/config";
import { AppDataSource } from "./database/AppDataSource";

const PORT = process.env.PORT || 3333;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
