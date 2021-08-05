const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("creativesincart", {
    creativeInCartID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    creativeID: DT.INTEGER,
    cartID: DT.INTEGER,
  });
};
