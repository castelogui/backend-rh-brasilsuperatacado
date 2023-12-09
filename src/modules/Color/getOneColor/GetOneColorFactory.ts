import { ColorRepository } from "../../../repositories/repositories/ColorRepository";
import { GetOneColorController } from "./GetOneColorController";
import { GetOneColorService } from "./GetOneColorService";

export const getOneColorFactory = () => {
  const colorRepository = new ColorRepository();
  const getOneColor = new GetOneColorService(colorRepository);
  const getOneColorController = new GetOneColorController(getOneColor);
  return getOneColorController;
};
