import express, { Application, NextFunction, Request, Response } from "express";
import { routes } from "./routes";
require("dotenv").config();

const app:Application = express();
app.use(express.json());
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

export { app };
