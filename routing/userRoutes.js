"use strict";


/** Routes for items. */

const express = require("express");

const { BadRequestError } = require("./expressError");
const router = new express.Router();

/** GET/items: get a list of shopping items */
router.get("/", function (req, res) {
  return res.json(items);
});


module.exports = router;
