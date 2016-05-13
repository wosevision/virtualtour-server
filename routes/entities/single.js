module.exports = (req, res) => {
  const entity = req.entity;

  res.status(200).json({ entity });
};