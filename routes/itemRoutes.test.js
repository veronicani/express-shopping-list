const request = require("supertest");

const app = require("../app");
let { items } = require("../fakeDb");

let pineapple = { name: "pineapple", price: 500};

beforeEach(function() {
  items.push(pineapple);
});

afterEach(function() {
  items = [];
});

/** GET /items: get a list of shopping items */

describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);

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

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({added: { name: "pizza", price: 5000 }});
  });
});


/** GET /items/:name: return single item */

/** PATCH /items/:name: accept JSON body, modify item, returns it */

/** DELETE /items/:name: deletes the item.*/