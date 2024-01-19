import { AppDataSource } from "../../database/AppDataSource";
import { User } from "../../entities/User";
import { IUserRepository } from "../Interfaces/IUserRepository";

const repository = AppDataSource.getRepository(User);

export class UserRepository implements IUserRepository {
  async create({ id, username, name, password }: User): Promise<User> {
    const user = repository.create({
      id,
      username,
      name,
      password,
    });

    await repository.save(user);
    return user;
  }
  async exists(username: string): Promise<boolean> {
    const user = await repository.findOneBy({ username });
    return !!user;
  }
  async getOne(id: string): Promise<User | Error> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean | void> {
    throw new Error("Method not implemented.");
  }
  async update({ id, username, name, password }: User): Promise<User | Error> {
    throw new Error("Method not implemented.");
  }
}
