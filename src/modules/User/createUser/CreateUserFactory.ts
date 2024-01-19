import { UserRepository } from "../../../repositories/repositories/UserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserService } from "./CreateUserService";

export const createUserFactory = () => {
  const userRepository = new UserRepository();
  const createUser = new CreateUserService(userRepository);
  const createUserController = new CreateUserController(createUser);
  return createUserController;
};
