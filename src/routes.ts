import { Router } from "express";
import { createCategoryFactory } from "./modules/Category/createCategory/CreateCategoryFactory";
import { getAllCategoryFactory } from "./modules/Category/getAllCategory/GetAllCategoriesFactory";
import { deleteCategoryFactory } from "./modules/Category/deleteCategory/DeleteCategoryFactory";
import { updateCategoryFactory } from "./modules/Category/updateCategory/UpdateCategoryFactory";
import { getOneCategoryFactory } from "./modules/Category/getOneCategory/GetOneCategoryFactory";
import { createColorFactory } from "./modules/Color/createColor/CreateColorFactory";
import { getAllColorsFactory } from "./modules/Color/getAllColor/GetAllColorsFactory";
import { getOneColorFactory } from "./modules/Color/getOneColor/GetOneColorFactory";

const routes = Router();

routes.get("/", (request, response) =>
  response.json({ status: "server is running" })
);
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

routes.post("/colors", (request, response) =>
  createColorFactory().handle(request, response)
);
routes.get("/colors", (request, response) =>
  getAllColorsFactory().handle(request, response)
);
routes.get("/colors/:id", (request, response) =>
  getOneColorFactory().handle(request, response)
);

export { routes };
