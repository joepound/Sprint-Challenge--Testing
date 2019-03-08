const db = require("../dbConfig.js");

module.exports = {
  insert: newGame => db("Games").insert(newGame, "id"),

  get: GameID =>
  GameID
      ? db("Games")
          .where({ GameID })
          .first()
      : db("Games"),

  delete: GameID =>
    db("Games")
      .delete()
      .where({ GameID })
};
