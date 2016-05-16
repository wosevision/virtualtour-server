module.exports = (req, res) => {
  const entity = req.Entity;

  res.status(200).json({ entity });
};