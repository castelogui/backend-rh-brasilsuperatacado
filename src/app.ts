import express, { Application, NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import cors from "cors";
import compression from "compression";
require("dotenv").config();

const app: Application = express();
app.use(express.json());
app.use(cors())
app.use(compression())
// Como utilizar uma rota padrão
// app.use("/api", routes);
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err}`,
    });
  }
);
app.use((req, res) => {
  return res.status(404).send("This route is invalid or does not exist");
});

export { app };
