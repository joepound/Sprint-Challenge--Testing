module.exports = (req, res) => {
  res.status(400).json({ errorInfo: "Bad request." });
};
