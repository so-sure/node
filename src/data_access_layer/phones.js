const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});

const GET_PHONE_BY_ID = `
    SELECT *
    FROM sosure.phone
    WHERE id=?
`
const DELETE_PHONE_BY_ID = `
    DELETE
    FROM sosure.phone
    WHERE id=?
`

const UPDATE_PHONE = `
  UPDATE sosure.phone
  SET make = ?,
  model = ?,
  storage = ?,
  monthly_premium = ?,
  excess = ?
  WHERE id = ?
`

async function getPhoneById(phoneId) {
    return new Promise((resolve,reject) => {
        connection.connect(function(err) {
          if (err) throw err;
          connection.query(
              GET_PHONE_BY_ID,
              [phoneId],
              function (err, result) {
                if (err) throw err;

                resolve(result[0]);
              });
        });
    })
}

async function deletePhoneById(phoneId) {
    return new Promise((resolve,reject) => {
        connection.connect(function(err) {
          if (err) throw err;
          connection.query(
              DELETE_PHONE_BY_ID,
              [phoneId],
              function (err, result) {
                if (err) throw err;
                resolve(result);
              });
        });
    })
}

async function updatePhone(phone) {
    return new Promise((resolve,reject) => {
        connection.connect(function(err) {
          if (err) throw err;
          connection.query(
              UPDATE_PHONE,
              [
                phone.make,
                phone.model,
                phone.storage,
                phone.monthly_premium,
                phone.excess,
                phone.id
              ],
              function (err, result) {
                if (err) throw err;
                resolve(result);
              });
        });
    })
}

module.exports = {
  getPhoneById,
  deletePhoneById,
  updatePhone
};
