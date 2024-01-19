import supertest from "supertest";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";
import { app } from "../../../src/app";

const mockAppDataSource = new MockAppDataSource();

function expect200(response: any) {
  return Object.keys(response.body).forEach((key) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(key);
    expect(response.body[key]).not.toBeNull();
  });
}

beforeAll(async () => {
  await mockAppDataSource.connect();
});
describe("Department => create", () => {
  it("should be create a department", async () => {
    const response = await supertest(app).post("/departments").send({
      code: "1",
      name: "Teste",
    });
    console.log(response.body);
    expect200(response);
  });
});
afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
