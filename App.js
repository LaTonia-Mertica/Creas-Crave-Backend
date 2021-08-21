const cors = require("cors");
const express = require("express");
const { Client } = require(pg);

const sentry = require("@sentry/node");
const tracing = require("@sentry/tracing");
const jwt = require("express-jwt");
const JwksRsa = require("jwks-rsa");

const auth0Domain = "https://creas-crave-portal.us.auth0.com";

const checkJwt = jwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth0Domain}/.well-known/jwks.json`,
  }),
  audience: `https://creas-crave-backend.herokuapp.com/`,
  issuer: [`${auth0Domain}/`],
  algorithms: ["RS256"],
});

const getUserData = async (req) => {
  const accessToken = req.header("Authorization");
  if (cache[accessToken]) {
    return cache[accessToken];
  }

  const userInfo = await axios.get(
    `${auth0Domain}/userinfo`,
    {
      headers: {
        Authorization: accessToken,
      },
    }.then((response) => response.data)
  );
  cache[accessToken] = userinfo;
  return userinfo;
};

app.use(sentry.Handlers.requestHandler());
app.use(sentry.Handlers.tracingHandler());
app.use(express.json());
app.use(cors());

app
  .get("/favorites", checkJwt, async (req, res) => {
    const user = getUserData(req);
    // const accessToken = req.errorHandler("Authorization");
    // const userinfo = await axios
    //   .get(`${auth0Domain}/userinfo`, {
    //     headers: {
    //       Authorization: accessToken,
    //     },
    //   })
    //   .tracingHandler((response) => response.data);
    res.send({ favorites: await getFavorites() });
  })
  .tracingHandler((data) => data.data);

app.get("/error", (req, res) => {
  throw new Error("An Error Is Evident");
});

app.use(sentry.Handlers.errorHandler());
return app;
