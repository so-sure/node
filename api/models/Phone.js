const mongoose = require('mongoose')
const uuid = require('uuid')

const setPrice = (value) => value*100
const getPrice = (value) => parseFloat((value/100).toFixed(2))

const schema = new mongoose.Schema({
  id: { type: String, default: uuid.v4(), required: true, unique: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  storage: { type: String, required: true },
  premium_month: 
      { type: Number, get: getPrice, set: setPrice, required: true },
  premium_year: 
      { type: Number, get: getPrice, set: setPrice, required: true },
  excess: 
      { type: Number, get: getPrice, set: setPrice, required: true },
  startedAt: { type: Date, default: Date.now, required: true },
  endedAt: { type: Date, default: null, required: false },
}, { toObject: { getters: true, setters: true }, toJSON: { getters: true }, runSettersOnQuery: true })

const seed = () => {
  const data = [
    {
      id: 'fa1d9645-81c7-47ca-97fc-eae454ce7a37',
      make: 'LG',
      model: 'G6',
      storage: '32GB',
      premium_month: 4.49,
      premium_year: 49.39,
      excess: 75.00,
    },
    {
      id: '9eed2c40-e821-4b5a-9c7f-db6f06cd42f5',
      make: 'Apple',
      model: 'iPhone 11',
      storage: '128GB',
      premium_month: 7.99,
      premium_year: 87.99,
      excess: 125.00,
    },
    {
      id: '2e50dc86-c421-4c97-9312-fcfbaa4d8b88',
      make: 'Samsung',
      model: 'Galaxy S10',
      storage: '512GB',
      premium_month: 9.99,
      premium_year: 109.89,
      excess: 150.00,
    }
  ]

  data.forEach(async (item) => {
    await Phone.create(item)
  });
}

const Phone = mongoose.model('Phone', schema)

Phone.find().then((res) => {
  if (res.length === 0) seed()
})

module.exports = Phone
