module.exports = (req, res) => {
  const location = req.Location;
  res.status(200).json({ location });
};