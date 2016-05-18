module.exports = (req, res) => {
  const scene = req.Scene;
  res.status(200).json({ scene });
};