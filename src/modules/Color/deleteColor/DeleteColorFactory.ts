import { ColorRepository } from "../../../repositories/repositories/ColorRepository";
import { DeleteColorController } from "./DeleteColorController";
import { DeleteColorService } from "./DeleteColorService";

export const deleteColorFactory = () => {
  const colorRepository = new ColorRepository();
  const deleteColor = new DeleteColorService(colorRepository);
  const deleteColorController = new DeleteColorController(deleteColor);
  return deleteColorController;
};
