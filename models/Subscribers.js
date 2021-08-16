const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("subscribers", {
    subscriberID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerID: DT.INTEGER,
    userID: DT.INTEGER,
    emailAddress: DT.STRING,
    subscribed: DT.BOOLEAN,
    // createAt: TIMESTAMP,
    // updatedAt: TIMESTAMP,
  });
};
