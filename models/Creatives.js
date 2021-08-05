const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("creatives", {
    creativeID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    creativeName: DT.STRING,
    filePath: DT.TEXT,
  });
};
