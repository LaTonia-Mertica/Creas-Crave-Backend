const Sequelize = require("sequelize");

let db;
let dbURL = process.env.DATABASE_URL;
if (!dbURL) {
  db = new Sequelize("postgres://latoniamertica@localhost:5432/creascrave", {
    logging: false,
    dialect: "postgres",
    protocol: "postgres",
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false, // very important
    //   },
    // },
  });
} else {
  db = new Sequelize(dbURL, {
    logging: false,
    dialect: "postgres",
    protocol: "postgres",
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false, // very important
    //   },
    // },
  });
}

const Cart = require("./Cart")(db);
const Creatives = require("./Creatives")(db);
const CreativesInCart = require("./CreativesInCart")(db);
const Customers = require("./Customers")(db);
const Favorites = require("./Favorites")(db);
const Users = require("./Users")(db);

const connectToDB = async () => {
  await db.authenticate();
  console.log(`Database Connected Successfully`);

  Customers.belongsTo(Users, { foreignKey: "userID" });
  Customers.hasMany(Favorites, { foreignKey: "customerID" });
  Customers.hasMany(CreativesInCart, { foreignKey: "cartID" });

  Cart.belongsTo(Customers, { foreignKey: "customerID" });
  Cart.hasMany(CreativesInCart, { foreignKey: "cartID" });
  Favorites.belongsTo(Creatives, { foreignKey: "creativeID" });

  Creatives.hasMany(Creatives, { primaryKey: "creativeID" });

  await db.sync(); //{ force: true }

  const customers = await Customers.findAll();
  let customer;
  if (customers.length === 0) {
    customer = await Customers.create({
      nameFirst: "Testy",
      nameLast: "McTesterson",
    });
  } else {
    customer = customers[0];
  }

  let creative;
  const creatives = await Creatives.findAll();
  if (creatives.length === 0) {
    creative = await Creatives.create({});
  } else {
    creative = creatives[0];
  }
  // const creatives = await Creatives.findAll();
  // if (creatives.length === 0) {
  //   await Creatives.create({ creativeName: "My Masterpiece", filePath: "TBD" });

  //   await Favorites.create({ customerID: 1, creativeID: 1 });
  // }

  const favorites = await Favorites.findAll();
  if (favorites.length === 0) {
    await Favorites.create({
      customerID: customer.customerID,
      creativeID: creative.id,
    });
  }
  const creativesInCart = await CreativesInCart.findAll();
  if (CreativesInCart.length === 0) {
    await CreativesInCart.create({
      customerID: 1,
      cartID: 1,
    });
  }
  const cart = await Cart.findAll();
  if (Cart.length === 0) {
    await Cart.create({ customerID: 1 });
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
