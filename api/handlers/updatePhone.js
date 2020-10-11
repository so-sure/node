module.exports = async (req, res, next) => {
  try {
    const { phone, body } = req

    Object.keys(body).forEach((key) => {
      phone[key] = body[key]
    })

    await phone.save()
    res.json(phone)
  } catch (err) {
    next(err)
  }
}
