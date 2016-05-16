module.exports = attr => {
  return (req, res, next, value) => {
    const a = req.Entity.attrs.id(value);
    if (a) {
      req[attr] = a;
      next();
    } else {
      res.status(404).send(`Invalid ${attr} ID`);
    }
  };
};