import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/Interfaces/IUserRepository";

type UserRequest = {
  id: string;
  username: string;
  name: string;
  password: string;
};

export class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    id,
    username,
    name,
    password,
  }: UserRequest): Promise<User | Error> {
    if (!username) {
      return new Error("Request missing arguments: username");
    }
    if (!name) {
      return new Error("Request missing arguments: name");
    }
    if (!password) {
      return new Error("Request missing arguments: password");
    }

    const userAlreadyExists = await this.userRepository.exists(username);

    if (userAlreadyExists) {
      return new Error("User already exists");
    }

    const user = this.userRepository.create({ id, username, name, password });

    return user;
  }
}
