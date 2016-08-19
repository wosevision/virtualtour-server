module.exports = (req, res) => {
  const building = req.Building;
  res.status(200).json(building);
};