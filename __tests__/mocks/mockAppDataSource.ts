import { AppDataSource } from "../../src/database/AppDataSource";

export class MockAppDataSource {
  async connect() {
    return await AppDataSource.initialize();
  }
  async destroy() {
    return await AppDataSource.destroy();
  }
  async drop() {
    return await AppDataSource.dropDatabase();
  }
}
