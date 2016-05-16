module.exports = (req, res) => {
  const attrs = req.entity.attrs;

  res.status(200).json({ attrs });
};