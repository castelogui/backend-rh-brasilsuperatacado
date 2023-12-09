import { ColorRepository } from "../../../repositories/repositories/ColorRepository";
import { GetAllColorsController } from "./GetAllColorsController";
import { GetAllColorsService } from "./GetAllColorsService";

export const getAllColorsFactory = () => {
  const colorsRepository = new ColorRepository();
  const getAllColors = new GetAllColorsService(colorsRepository);
  const getAllColorsController = new GetAllColorsController(getAllColors);
  return getAllColorsController;
};
