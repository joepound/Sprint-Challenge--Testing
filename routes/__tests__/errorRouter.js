const request = require("supertest");
const server = require("../../api/server.js");

describe("Bad request:", () => {
  const reqURL = "/4/0/4";

  it("• should return a JSON", async () => {
    const res = await request(server).get(reqURL);
    expect(res.type).toBe("application/json");
  });

  it("• should return status 400", async () => {
    const res = await request(server).get(reqURL);
    expect(res.status).toBe(400);
  });

  it("• should have a message indicating a bad request as the contents of the returned JSON", async () => {
    const res = await request(server).get(reqURL);
    expect(res.body).toEqual({ errorInfo: "Bad request." });
  });
});
