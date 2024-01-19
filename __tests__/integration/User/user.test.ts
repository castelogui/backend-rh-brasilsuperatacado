import supertest from "supertest";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";
import { app } from "../../../src/app";

function expect200(response: any) {
  return Object.keys(response.body).forEach((key) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(key);
    expect(response.body[key]).not.toBeNull();
  });
}

const mockAppDataSource = new MockAppDataSource();

beforeAll(async () => {
  await mockAppDataSource.connect();
});
describe("User => create", () => {
  it("should be create a user", async () => {
    const response = await supertest(app).post("/users").send({
      username: "guilhermecastelo",
      name: "Guilherme",
      password: "123456",
    });

    expect200(response);
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
