import { AppDataSource } from "./AppDataSource";

export async function connect() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Server connected to the database");
    })
    .catch((err) => {
      console.error("Unable to connect to database: ", err);
    });
}
