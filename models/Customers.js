const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("customers", {
    customerID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameFirst: DT.STRING,
    nameLast: DT.STRING,
    addressPhysicalNumberAndStreet: DT.STRING,
    addressPhysicalCity: DT.STRING,
    addressPhysicalState: DT.STRING(2),
    addressPhysicalZipCode: DT.STRING(5),
    phoneNumber: DT.STRING,
    addressShippingNumberAndStreet: DT.STRING,
    addressShippingCity: DT.STRING,
    addressShippingState: DT.STRING(2),
    addressShippingZipCode: DT.STRING(5),
    emailAddress: DT.STRING,
    userID: DT.INTEGER,
  });
};
