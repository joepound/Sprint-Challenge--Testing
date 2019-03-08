const router = require("express").Router();

const dbHelper = require("../data/helpers/gamesModel.js");

router.post("/", async (req, res) => {
  const newGame = req.body;

  if (!newGame.GameTitle) {
    res.status(422).json("Game title not supplied.");
  } else if (!newGame.GameGenre) {
    res.status(422).json("Game genre not supplied.");
  } else {
    try {
      const [addedGame] = await dbHelper.insert(newGame);
      res.status(201).json(addedGame);
    } catch (err) {
      res.status(500).json({ errorInfo: err.toString() });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const games = await dbHelper.get();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ errorInfo: err.toString() });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const game = await dbHelper.get(id);
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json("Game not found.");
    }
  } catch (err) {
    res.status(500).json({ errorInfo: err.toString() });
  }
});

module.exports = router;
