const mysql = require('mysql2');

const connection = mysql.createConnection({
  'host':     process.env.DATABASE_HOST,
  'user':     process.env.DATABASE_USER,
  'password': process.env.DATABASE_PASSWORD,
});

const MONTHS_IN_A_YEAR = 12;
const MONTHS_DISCOUNTED_ON_YEARLY_PREMIUMS = 1;
// Yearly premiums get 1 months discount
const NON_DISCOUNTED_MONTHS = MONTHS_IN_A_YEAR - MONTHS_DISCOUNTED_ON_YEARLY_PREMIUMS;

const PRICE_DECIMAL_PLACE = 2;

const GET_PHONE_BY_ID = `
    SELECT *
    FROM sosure.phone
    WHERE id=?
`;
const DELETE_PHONE_BY_ID = `
    DELETE
    FROM sosure.phone
    WHERE id=?
`;

const UPDATE_PHONE = `
  UPDATE sosure.phone
  SET make = ?,
  model = ?,
  storage = ?,
  monthly_premium = ?,
  excess = ?
  WHERE id = ?
`;

async function connectDatabase() {
  return new Promise((resolve, reject) => {
    connection.connect(function(err) {
      if (err) {
        reject(err);
      }
      resolve()
    })
  })
}

async function getPhoneById(phoneId) {
  await connectDatabase();

  return new Promise((resolve, reject) => {
      connection.query(
        GET_PHONE_BY_ID,
        [ phoneId ],
        function (err, result) {
          if (err) {
            throw err;
          }

          const [ foundPhone ] = result;
          if (!foundPhone) {
            return resolve(foundPhone);
          }

          const castMonthlyPremiums = Number(foundPhone.monthly_premium);

          const yearlyPremium = Number(foundPhone.monthly_premium * NON_DISCOUNTED_MONTHS).toFixed(PRICE_DECIMAL_PLACE);

          const casted = {
            ...foundPhone,
            'monthly_premium': castMonthlyPremiums,
            'yearly_premium':  yearlyPremium,

          };
          resolve(casted);
        });
  });
}

async function deletePhoneById(phoneId) {
  await connectDatabase();

  return new Promise((resolve, reject) => {
      connection.query(
        DELETE_PHONE_BY_ID,
        [ phoneId ],
        function (err, result) {
          if (err) {
            throw err;
          }
          resolve(phoneId);
        });
  });
}

async function updatePhone(phone) {
  await connectDatabase();

  return new Promise((resolve, reject) => {
      connection.query(
        UPDATE_PHONE,
        [
          phone.make,
          phone.model,
          phone.storage,
          phone.monthly_premium,
          phone.excess,
          phone.id,
        ],
        function (err, result) {
          if (err) {
            throw err;
          }
          resolve(phone);
        });
  });
}

module.exports = {
  phones: {
      getPhoneById,
      deletePhoneById,
      updatePhone,
  }
};
