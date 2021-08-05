const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("cart", {
    cartID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerID: DT.INTEGER,
    paymentConfirmation: DT.STRING,
  });
};
