const Phone = require('../models/Phone')

module.exports = async (req, res, next) => {
  try {
    const phones = await Phone.find();
    res.json(phones);
  } catch (err) {
    next(err)
  }
}
