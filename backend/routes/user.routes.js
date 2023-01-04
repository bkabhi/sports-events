const express = require("express");
const { register, login, refreshToken } = require("../controllers");

const user = express.Router();

user.post("/signup", register);
user.post("/login", login);
user.get("/refreshToken/:refreshToken", refreshToken);

module.exports = user;
