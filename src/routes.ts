import { Router } from "express";
import { createCategoryFactory } from "./modules/Category/createCategory/CreateCategoryFactory";
import { getAllCategoryFactory } from "./modules/Category/getAllCategory/GetAllCategoriesFactory";
import { deleteCategoryFactory } from "./modules/Category/deleteCategory/DeleteCategoryFactory";
import { updateCategoryFactory } from "./modules/Category/updateCategory/UpdateCategoryFactory";
import { getOneCategoryFactory } from "./modules/Category/getOneCategory/GetOneCategoryFactory";

const routes = Router();

routes.post("/categories", (request, response) =>
  createCategoryFactory().handle(request, response)
);
routes.get("/categories", (request, response) =>
  getAllCategoryFactory().handle(request, response)
);
routes.get("/categories/:id", (request, response) =>
  getOneCategoryFactory().handle(request, response)
);
routes.delete("/categories/:id", (request, response) => {
  deleteCategoryFactory().handle(request, response);
});
routes.put("/categories/:id", (request, resonse) =>
  updateCategoryFactory().handle(request, resonse)
);

export { routes };
