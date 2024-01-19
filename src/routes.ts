import { Router } from "express";
import { createCategoryFactory } from "./modules/Category/createCategory/CreateCategoryFactory";
import { getAllCategoryFactory } from "./modules/Category/getAllCategory/GetAllCategoriesFactory";
import { deleteCategoryFactory } from "./modules/Category/deleteCategory/DeleteCategoryFactory";
import { updateCategoryFactory } from "./modules/Category/updateCategory/UpdateCategoryFactory";
import { getOneCategoryFactory } from "./modules/Category/getOneCategory/GetOneCategoryFactory";
import { createColorFactory } from "./modules/Color/createColor/CreateColorFactory";
import { getAllColorsFactory } from "./modules/Color/getAllColor/GetAllColorsFactory";
import { getOneColorFactory } from "./modules/Color/getOneColor/GetOneColorFactory";
import { updateColorFactory } from "./modules/Color/updateColor/UpdateColorFactory";
import { deleteColorFactory } from "./modules/Color/deleteColor/DeleteColorFactory";
import { createItemFactory } from "./modules/Item/createItem/CreateItemFactory";
import { getAllItemFactory } from "./modules/Item/getAllItem/GetAllItemFactory";
import { getOneItemFactory } from "./modules/Item/getOneItem/GetOneItemFactory";
import { updateItemFactory } from "./modules/Item/updateItem/UpdateItemFactory";
import { deleteItemFactory } from "./modules/Item/deleteItem/DeleteItemFactory";
import { createTypeMovementFactory } from "./modules/TypeMovement/createTypeMovement/CreateTypeMovementFactory";
import { getAllTypeMovementFactory } from "./modules/TypeMovement/getAllTypeMovement/getAllTypeMovementFactory";
import { getOneTypeMovementFactory } from "./modules/TypeMovement/getOneTypeMovement/GetOneTypeMovementFactory";
import { updateTypeMovementFactory } from "./modules/TypeMovement/updateTypeMovement/UpdateTypeMovementFactory";
import { deleteTypeMovementFactory } from "./modules/TypeMovement/deleteTypeMovement/DeleteTypeMovementFactory";
import { createMovementFactory } from "./modules/Movement/createMovement/CreateMovementFactory";
import { getAllMovementFactory } from "./modules/Movement/getAllMovement/GetAllMovementFactory";
import { getOneMovementFactory } from "./modules/Movement/getOneMovement/GetOneMovementFactory";
import { updateMovementFactory } from "./modules/Movement/updateMovement/UpdateMovementFactory";
import { deleteMovementFactory } from "./modules/Movement/deleteMovement/DeleteMovementFactory";
import { createUserFactory } from "./modules/User/createUser/CreateUserFactory";

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
routes.put("/colors/:id", (request, response) =>
  updateColorFactory().handle(request, response)
);
routes.delete("/colors/:id", (request, response) =>
  deleteColorFactory().handle(request, response)
);

routes.post("/items", (request, response) =>
  createItemFactory().handle(request, response)
);
routes.get("/items", (request, response) =>
  getAllItemFactory().handle(request, response)
);
routes.get("/items/:id", (request, response) =>
  getOneItemFactory().handle(request, response)
);
routes.put("/items/:id", (request, response) =>
  updateItemFactory().handle(request, response)
);
routes.delete("/items/:id", (request, response) =>
  deleteItemFactory().handle(request, response)
);

routes.post("/typemovement", (request, response) =>
  createTypeMovementFactory().handle(request, response)
);
routes.get("/typemovement", (request, response) =>
  getAllTypeMovementFactory().handle(request, response)
);
routes.get("/typemovement/:id", (request, response) =>
  getOneTypeMovementFactory().handle(request, response)
);
routes.put("/typemovement/:id", (request, response) =>
  updateTypeMovementFactory().handle(request, response)
);
routes.delete("/typemovement/:id", (request, response) =>
  deleteTypeMovementFactory().handle(request, response)
);

routes.post("/movements", (request, response) =>
  createMovementFactory().handle(request, response)
);
routes.get("/movements", (request, response) =>
  getAllMovementFactory().handle(request, response)
);
routes.get("/movements/:id", (request, response) =>
  getOneMovementFactory().handle(request, response)
);
routes.put("/movements/:id", (request, response) =>
  updateMovementFactory().handle(request, response)
);
routes.delete("/movements/:id", (request, response) =>
  deleteMovementFactory().handle(request, response)
);

routes.post("/users", (request, response) =>
  createUserFactory().handle(request, response)
);
export { routes };
