const request = require("supertest");
const server = require("../../api/server.js");

const db = require("../../data/dbConfig");
const dbHelper = require("../../data/helpers/gamesModel");

describe("Games routes:", () => {
  const testGames = [
    {
      GameID: 1,
      GameTitle: "Metal Gear",
      GameGenre: "Stealth",
      GameReleaseYear: 1987
    },
    {
      GameID: 2,
      GameTitle: "Fallout",
      GameGenre: "RPG",
      GameReleaseYear: 1997
    },
    {
      GameID: 3,
      GameTitle: "Tekken",
      GameGenre: "Fighting",
      GameReleaseYear: 1994
    },
    {
      GameID: 4,
      GameTitle: "Pong",
      GameGenre: "Sports",
      GameReleaseYear: null
    }
  ];
  const insertAllGames = () => testGames.forEach(game => (async () => await dbHelper.insert(game))());

  afterEach(() => db("Games").truncate());

  describe(`Request to "POST /games":`, () => {
    const reqURL = "/games";

    it("• should return a JSON", async () => {
      const res = await request(server).post(reqURL);
      expect(res.type).toBe("application/json");
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
      expect(addedGame).toEqual(testGames[0]);
    });

    it("• should return status 422 upon sending incomplete information", async () => {
      const res = await request(server)
        .post(reqURL)
        .send({});
      expect(res.status).toBe(422);
    });
  });

  describe(`Request to "GET /games":`, () => {
    const reqURL = "/games";

    it("• should return a JSON", async () => {
      const res = await request(server).get(reqURL);
      expect(res.type).toBe("application/json");
    });

    it("• should return status 200", async () => {
      const res = await request(server).get(reqURL);
      expect(res.status).toBe(200);
    });

    it("• should return an empty array if the Games table is empty", async () => {
      const res = await request(server).get(reqURL);
      expect(res.body).toEqual([]);
    });

    it("• should retrieve all games", async () => {
      insertAllGames();

      const res = await request(server).get(reqURL);
      expect(res.body).toEqual(testGames);
    });
  });

  describe(`Request to "GET /games/:id"`, () => {
    const reqURL = id => `/games/${id}`;

    it("• should return a JSON", async () => {
      const res = await request(server).get(reqURL(1));
      expect(res.type).toBe("application/json");
    });

    it("• should return status 200 if game exists", async () => {
      await dbHelper.insert(testGames[0]);

      const res = await request(server).get(reqURL(1));
      expect(res.status).toBe(200);
    });

    it("• should return status 404 if game does not exist", async () => {
      const res = await request(server).get(reqURL(1));
      expect(res.status).toBe(404);
    });

    it("• should return the requested game with the corresponding ID", async() => {
      await dbHelper.insert(testGames[0]);

      const res = await request(server).get(reqURL(1));
      expect(res.body).toEqual(testGames[0]);
    });
  });

  describe(`Request to "DELETE /games/:id"`, () => {
    const reqURL = id => `/games/${id}`;

    it("• should return a JSON", async () => {
      const res = await request(server).delete(reqURL(1));
      expect(res.type).toBe("application/json");
    });

    it("• should return status 200 if game exists", async () => {
      await dbHelper.insert(testGames[0]);

      const res = await request(server).delete(reqURL(1));
      expect(res.status).toBe(200);
    });

    it("• should return status 404 if game does not exist", async () => {
      const res = await request(server).delete(reqURL(1));
      expect(res.status).toBe(404);
    });

    it("• should actually delete the specified game", async () => {
      insertAllGames();
      await request(server).delete(reqURL(1));

      const remainingGames = await dbHelper.get();
      expect(remainingGames).toEqual(testGames.slice(1));
    });
  });
});
