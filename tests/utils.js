const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "foobar",
});

async function postTestData(phone) {
    return new Promise((resolve,reject) => {
        connection.connect(function(err) {
          if (err) throw err;
          connection.query(
              "INSERT INTO sosure.phone (make, model, storage, monthly_premium, excess, id) VALUES (?,?,?,?,?,?)",
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
                resolve(result)
              });
        });
    });
}

function clearData() {
    connection.connect(function(err) {
      if (err) throw err;
      connection.query(
          "DELETE FROM sosure.phone",
          function (err, result) {
            if (err) throw err;
          });
    });
}


module.exports = {
    postTestData,
    clearData
};
