import "reflect-metadata";
import { app } from "./app";
import { connect } from "./database/connect";

connect().then(() => {
  app.listen(process.env.PORT, () => console.log("Server is running"));
});
