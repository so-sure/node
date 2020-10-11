module.exports = async (req, res, next) => {
  try {
    const { phone } = req
    res.json(phone)
  } catch (err) {
    next(err)
  }
}
