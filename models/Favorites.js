const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("favorites", {
    favoriteID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerID: DT.INTEGER,
    creativeID: DT.INTEGER,
  });
};
