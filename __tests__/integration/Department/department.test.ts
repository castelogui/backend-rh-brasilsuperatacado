import supertest from "supertest";
import { MockAppDataSource } from "../../mocks/mockAppDataSource";
import { app } from "../../../src/app";

const mockAppDataSource = new MockAppDataSource();

function expect200(response: any) {
  expect(response.error).toBe(false);
  expect(response.status).toBe(200);
  return Object.keys(response.body).forEach((key) => {
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
      code: "2",
      name: "Teste",
    });
    expect(response.status).toBe(400);
    expect(response.body).toBe("Department already exists with name");
  });
  it("shouldn't let a department with the same code be created", async () => {
    const response = await supertest(app).post("/departments").send({
      code: "1",
      name: "Testes",
    });
    expect(response.status).toBe(400);
    expect(response.body).toBe("Department already exists with code");
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

describe("Department => get", () => {
  it("should return a department", async () => {
    const department = await supertest(app)
      .post("/departments")
      .send({ name: "get department", code: "3" });

    const response = await supertest(app).get(
      `/departments/${department.body.id}`
    );
    expect200(response);
  });
  it("should not be return a department if id is incorrect or invalid", async () => {
    const response = await supertest(app).get("/departments/123");
    expect(response.status).toBe(400);
    expect(response.body).toBe("Department does not exists");
  });
  it("should return a list departments", async ()=>{
    const departments = await supertest(app).get("/departments")

    expect(departments.status).toBe(200);
    expect(Array.isArray(departments.body)).toBe(true);
    departments.body.forEach((obj: any) => {
      Object.keys(obj).forEach((key) => {
        expect(obj).toHaveProperty(key);
        expect(obj[key]).not.toBeNull();
      });
    });
  })
});

afterAll(async () => {
  await mockAppDataSource.drop();
  await mockAppDataSource.destroy();
});
