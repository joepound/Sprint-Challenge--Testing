const db = require("../dbConfig.js");

module.exports = {
  insert: newGame => db("Games").insert(newGame, "id"),

  get: id =>
    id
      ? db("Games")
          .where({ id })
          .first()
      : db("Games"),

  delete: id =>
    db("Games")
      .delete()
      .where({ id })
};
