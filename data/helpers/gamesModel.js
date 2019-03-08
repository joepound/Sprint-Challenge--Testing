const db = require("../dbConfig.js");

module.exports = {
  insert: newGame => db("Games").insert(newGame, "id"),

  get: GameID =>
    GameID
      ? db("Games")
          .select("GameID", "GameTitle", "GameGenre", "GameReleaseYear")
          .where({ GameID })
          .first()
      : db("Games").select(
          "GameID",
          "GameTitle",
          "GameGenre",
          "GameReleaseYear"
        ),

  delete: GameID =>
    db("Games")
      .delete()
      .where({ GameID })
};
