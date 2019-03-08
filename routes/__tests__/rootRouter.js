const request = require("supertest");
const server = require("../../api/server.js");

describe("Root URL request:", () => {
  const reqURL = "/";

  it("• should return a JSON", async () => {
    const res = await request(server).get(reqURL);
    expect(res.type).toBe("application/json");
  });

  it("• should return status 200", async () => {
    const res = await request(server).get(reqURL)
    expect(res.status).toBe(200);
  });

  it("• should have the app name as the contents of the returned JSON", async () => {
    const res = await request(server).get(reqURL);
    expect(res.body).toEqual({ app: "Games API" });
  });
});
