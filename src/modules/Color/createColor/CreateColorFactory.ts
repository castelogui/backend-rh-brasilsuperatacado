import { ColorRepository } from "../../../repositories/repositories/ColorRepository";
import { CreateColorController } from "./CreateColorController";
import { CreateColorService } from "./CreateColorService";

export const createColorFactory = () => {
  const colorRepository = new ColorRepository();
  const createColor = new CreateColorService(colorRepository);
  const createColorController = new CreateColorController(createColor);
  return createColorController;
};
