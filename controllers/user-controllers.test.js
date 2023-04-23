const mongoose = require("mongoose");
const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");

const { User } = require("../models/user-schema");

const { DB_HOST} = process.env;

describe("test /api/users/login", () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(3000);
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login route with correct data", async () => {
    const loginData = {
      email: "maya@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/users/login").send(loginData);

    const user = await User.findOne({
      email: loginData.email,
    });
    const payload = {
      id: user._id,
    };

    console.log('payloadID',payload.id);

    
    const decodedToken = jwt.decode(res.body.token);
    console.log('decodeedToken', decodedToken)

    expect(res.statusCode).toBe(200);
    expect(decodedToken.id).toBe(payload.id.toString());
    expect(user.email).toBe(loginData.email);
    expect(res.body.subscription).toBe(user.subscription);
  });
});
