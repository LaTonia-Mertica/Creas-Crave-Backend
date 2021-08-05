const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("users", {
    userID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameFirst: DT.STRING,
    nameLast: DT.STRING,
    jobTitle: DT.STRING,
    username: DT.STRING,
    password: DT.STRING,
  });
};
