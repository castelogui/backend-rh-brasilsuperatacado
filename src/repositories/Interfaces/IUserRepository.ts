import { User } from "../../entities/User";

export interface IUserRepository {
  create({ id, username, name, password }): Promise<User>;
  exists(username: string): Promise<boolean>;
  getOne(id: string): Promise<User | Error>;
  getAll(): Promise<User[]>;
  delete(id: string): Promise<boolean | void>;
  update({ id, username, name, password }): Promise<User | Error>;
}
