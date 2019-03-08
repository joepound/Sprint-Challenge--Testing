const request = require("supertest");
const server = require("../../api/server.js");

const db = require("../../data/dbConfig");
const dbHelper = require("../../data/helpers/gamesModel");

describe("Games routes:", () => {
  const testGames = [
    {
      GameTitle: "Metal Gear",
      GameGenre: "Stealth",
      GameReleaseYear: 1987
    },
    {
      GameTitle: "Fallout",
      GameGenre: "RPG",
      GameReleaseYear: 1997
    },
    {
      GameTitle: "Tekken",
      GameGenre: "Fighting",
      GameReleaseYear: 1994
    },
    {
      GameTitle: "Pong",
      GameGenre: "Sports"
    }
  ];

  afterEach(() => db("games").truncate());

  describe(`Request to "POST /games":`, () => {
    const reqURL = "/games";

    it("• should return a string", async () => {
      const res = await request(server).post(reqURL);
      expect(res.type).toBe("string");
    });

    it("• should return status 201", async () => {
      const res = await request(server)
        .post(reqURL)
        .send(testGames[0]);
      expect(res.status).toBe(201);
    });

    it("• should return the ID of the inserted game", async () => {
      const res = await request(server)
        .post(reqURL)
        .send(testGames[0]);
      expect(res.body).toEqual(1);
    });

    it("• should actually insert the new game into the database", async () => {
      await request(server)
        .post(reqURL)
        .send(testGames[0]);

      const addedGame = await dbHelper.get(1);
      expect(addedGame).toEqual(expectedGame[0]);
    });

    it("• should return status 422 upon sending incomplete information", async () => {
      const res = await request(server)
        .post(reqURL)
        .send({});
      expect(res.status).toBe(422);
    });
  });
});
