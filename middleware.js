"use strict";


/** Pattern matched from demo example middleware. */

const { UnauthorizedError } = require("./expressError");


/** Logger: prints log message and goes to next. */

function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}
// end logger

/** Check that name param must be Elie or raise Unauth. */

function onlyAllowElie(req, res, next) {
  if (req.params.name === "Elie") {
    return next();
  } else {
    throw new UnauthorizedError("Unauthorized");
  }
}
// end onlyAllowElie


module.exports = { logger, onlyAllowElie };
