module.exports = (req, res) => {

  const a = req.attr;
  req.attr.remove();
  req.Entity.save(function(err) {
    if (err) {
      return res.status(400).json(err);
    }
    var message = {
      message: 'Successfully removed attribute',
      success: true,
      removed: a
    }

    res.status(200).json(message);

  });

};