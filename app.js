"use strict";

/** App for shopping list. */

const express = require("express");
const { NotFoundError } = require("./expressError");
const app = express();

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const { logger, onlyAllowElie } = require("./middleware");

app.use(express.json());

// this applies to all requests at all paths
app.use(logger);

// apply a prefix to every route in userRoutes
app.use("/users", userRoutes);

// apply a prefix to every route in itemRoutes
app.use("/items", itemRoutes);

/** Greet user, only if it is Elie. */

app.get(
  "/hello/:name",
  // first function -- middleware function
  onlyAllowElie,
  // second function -- our view function
  function (req, res) {
    return res.json({ "greeting": `Hello, ${req.params.name}` });
  }
);
// end


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});


module.exports = app;