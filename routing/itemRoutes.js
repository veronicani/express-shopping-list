"use strict";

/** Routes for items. */

const express = require("express");

const { items } = require("./fakeDb");
const { BadRequestError, NotFoundError } = require("./expressError");
const router = new express.Router();

/** GET /items: get a list of shopping items */
router.get("/", function (req, res) {
  return res.json(items);
});

/** POST /items: add item to list of shopping items.
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


/** GET /items/:name: return single item */
router.get('/:name', function (req, res) {

  const singleItemName = req.params.name;

  let item;
  try {
    item = items.find(x => x.name === singleItemName)
  } catch {
    throw new NotFoundError();
  }

  // if (!(items.find(x => x.name === singleItemName))) {
  //   throw new NotFoundError();
  // }

  // const item = items.find(x => x.name === singleItemName);

  console.log('singleItem:', item);

  return res.json(item);
});


/** PATCH /items/:name: accept JSON body, modify item, returns it */
router.patch('/:name', function (req, res) {

  if (req.body === undefined) throw new BadRequestError();

  const singleItemName = req.params.name;

  let item;
  try {
    item = items.find(x => x.name === singleItemName)
  } catch {
    throw new NotFoundError();
  }

  item.name = req.body.name;
  item.price = req.body.price;

  console.log('updated', item);

  return res.json({
    updated: item
  });


  // return res.json({
  //   name: req.body.name,
  //   price: req.body.price
  // });
});




module.exports = router;

