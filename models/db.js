const Sequelize = require("sequelize");

const db = new Sequelize(
  "postgres://latoniamertica@localhost:5432/creascrave",
  {
    logging: false,
  }
);

const Cart = require("./Cart")(db);
const Creatives = require("./Creatives")(db);
const CreativesInCart = require("./CreativesInCart")(db);
const Customers = require("./Customers")(db);
const Favorites = require("./Favorites")(db);
const Users = require("./Users")(db);

const connectToDB = async () => {
  await db.authenticate();
  console.log(`Database Connected Successfully`);

  Customers.hasMany(Favorites, { foreignKey: "customerID" });
  Favorites.belongsTo(Creatives, { foreignKey: "creativeID" });
  Customers.belongsTo(Users, { foreignKey: "userID" });

  await db.sync(); //{ force: true }

  const customers = await Customers.findAll();
  if (customers.length === 0) {
    await Customers.create({ nameFirst: "Testy", nameLast: "McTesterson" });
  }

  const creatives = await Creatives.findAll();
  if (creatives.length === 0) {
    await Creatives.create({ creativeName: "My Masterpiece", filePath: "TBD" });

    await Favorites.create({ customerID: 1, creativeID: 1 });
  }
};

connectToDB();
module.exports = {
  db,
  Cart,
  Creatives,
  CreativesInCart,
  Customers,
  Favorites,
  Users,
};
