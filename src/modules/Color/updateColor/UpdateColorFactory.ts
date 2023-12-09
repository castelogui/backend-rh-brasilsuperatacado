import { ColorRepository } from "../../../repositories/repositories/ColorRepository";
import { UpdateColorController } from "./UpdateColorController";
import { UpdateColorService } from "./UpdateColorService";

export const updateColorFactory = () => {
  const colorRepository = new ColorRepository();
  const updateColor = new UpdateColorService(colorRepository);
  const updateColorController = new UpdateColorController(updateColor);
  return updateColorController;
};
