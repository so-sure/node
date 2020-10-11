module.exports = async (req, res, next) => {
  try {
    const { phone } = req
    await phone.deleteOne()
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
