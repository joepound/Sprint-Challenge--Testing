exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex("Games")
    .truncate()
    .then(() =>
      // Inserts seed entries
      knex("Games").insert([
        {
          GameTitle: "Pacman",
          GameGenre: "Arcade",
          GameReleaseYear: 1980
        }
      ])
    );
