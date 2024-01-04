"use strict";

/** Routes for items. */

const express = require("express");

const { items } = require("./fakeDb");
const { BadRequestError } = require("./expressError");
const router = new express.Router();

/** GET/items: get a list of shopping items */
router.get("/", function (req, res) {
  return res.json(items);
});

/** POST/items: add item to list of shopping items.
 *      Accepts: JSON, like {name: <item>, price: <price>}
 *      Returns: JSON, like {added: {name: "popsicle", price: 1.45}}
 */
router.post("/", function (req, res) {
  console.log("req.body: ", req.body);

  if (req.body === undefined) throw new BadRequestError();

  items.push(req.body);
  console.log("items w/ added item: ", items);
  return res.json({
    name: req.body.name,
    price: req.body.price
  });
});




module.exports = router;

