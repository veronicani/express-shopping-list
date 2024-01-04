"use strict";
// TODO: ^ don't forget this!

const request = require("supertest");

const app = require("../app");
let { items } = require("../fakeDb");

let pineapple;

beforeEach(function() {

  pineapple = { name: "pineapple", price: 500};
  items.push(pineapple);

  console.log('beforeEach ran before each test', items);
  console.log('beforeEach ran before each test', items.length);
});

afterEach(function() {
  // items = [];
  // TODO: ^ points items to different arr
  items.length = 0;
  // TODO: now still refers to same referenced arr
  console.log('afterEach ran after each test', items);
  console.log('afterEach ran after each test', items.length);
});

/** GET /items: get a list of shopping items */

describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);

    expect(items.length).toEqual(1);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual([{ name: "pineapple", price: 500 }]);
  });
});

/** POST /items: add item to list of shopping items. */

describe("POST /items", function() {
  it("Returns a JSON of added item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "pizza",
        price: 5000
      });

      console.log('This is items', items);

    expect(resp.statusCode).toEqual(201);
    expect(items.length).toEqual(2);
    expect(resp.body).toEqual({added: { name: "pizza", price: 5000 }});
  });
});


/** GET /items/:name: return single item */

describe("GET /items/:name", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items/pineapple`);

    expect(items.length).toEqual(1);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ name: "pineapple", price: 500 });
  });
});

/** PATCH /items/:name: accept JSON body, modify item, returns it */

describe("PATCH /items/:name", function() {
  it("Returns a JSON of updated item", async function() {
    const resp = await request(app)
      .patch(`/items/pineapple`)
      .send({
        name: "orange",
        price: 1
      });


    expect(resp.statusCode).toEqual(200);
    expect(items.length).toEqual(1);
    expect(resp.body).toEqual({updated: { name: "orange", price: 1 }});
  });
});

/** DELETE /items/:name: deletes the item.*/

describe("DELETE /items/:name", function() {
  it("Returns a JSON of deleted item", async function() {
    const resp = await request(app)
      .delete(`/items/pineapple`);

      console.log('This is items', items);

    expect(items.length).toEqual(0);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({message: "Deleted"});
  });
});