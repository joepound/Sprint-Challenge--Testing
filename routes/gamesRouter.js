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
      res.status(201).json(addedGame)
    } catch (err) {
      res.status(500).json({ errorInfo: err.toString() });
    }
  }
});

module.exports = router;