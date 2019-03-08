
exports.up = (knex, Promise) =>
  knex.schema.createTable("Games", tbl => {
    tbl.increments("GameID");

    tbl.string("GameTitle").notNullable();
    tbl.string("GameGenre").notNullable();
    tbl.integer("GameReleaseYear");

    tbl.timestamps(true, true);
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists("Games");
