import { Router } from "express";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { GetAllCategoriesController } from "./controllers/category/GetAllCategoriesController";
import { DeleteCategoryController } from "./controllers/category/DeleteCategoryController";
import { UpdateCategoryController } from "./controllers/category/UpdateCategoryController";

const routes = Router();

routes.post("/categories", new CreateCategoryController().handle);
routes.get("/categories", new GetAllCategoriesController().handle);
routes.delete("/categories/:id", new DeleteCategoryController().handle);
routes.put("/categories", new UpdateCategoryController().handle);

export { routes };
