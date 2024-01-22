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
    expect200(response);
  });
  it("shouldn't let a department with the same name be created", async () => {
    const response = await supertest(app).post("/departments").send({
      code: "1",
      name: "Teste",
    });
    expect(response.status).toBe(400);
    expect(response.body).toBe("Department already exists");
  });
  it("should return an error if the name field does not exist", async () => {
    const response = await supertest(app)
      .post("/departments")
      .send({ description: "teste", code: "1" });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: name");
  });
  it("should return an error if the code field does not exist", async () => {
    const response = await supertest(app)
      .post("/departments")
      .send({ description: "teste", name: "TI" });

    expect(response.status).toBe(400);
    expect(response.body).toBe("Request missing arguments: code");
  });
});

afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
