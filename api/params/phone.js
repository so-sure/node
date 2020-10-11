const Phone = require('../models/Phone')

module.exports = async (req, res, next, id) => {
  try {
    const phone = await Phone.findOne({ id })
    if (!phone) throw { message: "not found", response: { status: 404 } }
    req.phone = phone
    next()
  } catch(err) {
    next(err)
  }
}
