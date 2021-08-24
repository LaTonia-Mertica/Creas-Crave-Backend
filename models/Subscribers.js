const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("subscribers", {
    subscriberID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emailAddress: DT.STRING,
    subscribed: DT.BOOLEAN,
  });
};
