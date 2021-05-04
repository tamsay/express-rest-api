const app = require("../app.ts"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

it("tests the GET endpoint for All entries", async (done) => {
  const response = await request.get("/");
  expect(response.statusCode).toEqual(200);
  //   expect(Object.keys(response.body[0]).length).toBe(11);
  done();
});

it("tests the GET endpoint for a single entry", async (done) => {
  const response = await request.get("/1");
  expect(response.statusCode).toEqual(200);
  //   expect(Object.keys(response.body).length).toBe(11);
  done();
});

it("tests the POST endpoint", async (done) => {
  const response = await request.post("/");
  expect(response.statusCode).toEqual(201);
  done();
});

it("tests the PUT endpoint", async (done) => {
  const response = await request.put("/1");
  expect(response.statusCode).toEqual(200);
  done();
});

it("tests the DELETE endpoint", async (done) => {
  const response = await request.delete("/1");
  expect(response.statusCode).toEqual(200);
  done();
});
