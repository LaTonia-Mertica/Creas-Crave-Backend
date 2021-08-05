const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

server.use(require("body-parser").json());

const {
  db,
  Cart,
  Creatives,
  CreativesInCart,
  Customers,
  Favorites,
  Users,
} = require("./models/db.js");
const Op = require("sequelize").Op;
const { ConnectionRefusedError } = require("sequelize");

const isLoggedInMiddleware = async (req, res, next) => {
  if (!req.headers.email || !req.headers.password) {
    res.send({ error: "Authentication Required as Specified in Criteria" });
  } else {
    const customersDB = await Customers.findOne({
      where: { emailAddress: req.headers.emailAddress },
    });
  }
  if (!customersDB) {
    res.send({
      error: "No Known Customer Account Exists at That Email Address",
    });
  } else {
    if (customersDB.password === req.headers.password) {
      res.locals.customers = customersDB;
      next();
    } else {
      res.send({ error: "Password Not a Match to Customer Account" });
    }
  }
};

server.get(`/`, (req, res) => {
  res.send({ hello: "Code World - Creas Crave API is Running!" });
});

server.get("/customers/:pageNum", isLoggedInMiddleware, async (req, res) => {
  const page = parseInt(req.params.pageNum);
  if (page <= 0) {
    res.send({ customers: await Customers.findAndCountAll({ limit: 5 }) });
  } else {
    res.send({
      customers: await Customers.findAndCountAll({
        limit: 5,
        offset: 5 * (page - 1),
      }),
    });
  }
});

server.post("/customers", async (req, res) => {
  if (req.body.addressShippingZipCode.length !== 5) {
    res.send({ error: "Zip Code Too Short" });
  } else {
    const newUser = await Users.create({
      username: req.body.username,
      password: req.body.password,
    });
    const newCustomer = await Customers.create({
      ...req.body,
      userID: newUser.userID,
    });
    res.send({ customer: newCustomer });
  }
});

server.post(`/customersSearch`, async (req, res) => {
  res.send({
    customers: await Customers.findAll({
      where: {
        [Op.or]: {
          nameFirst: { [Op.iLike]: `%${req.body.searchQuery}%` },
          nameLast: { [Op.iLike]: `%${req.body.searchQuery}%` },
        },
      },
    }),
  });
});

server.post(`/login`, async (req, res) => {
  const customersDB = await Customers.findOne({
    where: { emailAddress: req.headers.emailAddress },
  });
  console.log(customersDB);

  if (!customersDB) {
    res.send({
      error: "No Customer Account Known to Exist at That Email Address",
    });
  } else {
    if (customersDB.password === req.headers.password) {
      res.send({ success: true });
    } else {
      res.send({ error: "Password Does Not Match Customer Account" });
    }
  }
});

server.get("/customersFavorites", async (req, res) => {
  res.send({
    customers: await Customers.findAll({
      include: [{ model: Favorites, include: [{ model: Creatives }] }],
    }),
  });
});

server.listen(4400, () => {
  console.log("Server Listening on Port 4400");
});
