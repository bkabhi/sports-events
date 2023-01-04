const express = require("express");
const { createEvent, getAllEvents } = require("../controllers");
const { getEventDetails } = require("../controllers/event.controller");
const { authMiddleware } = require("../middlewares/auth.midleware");

const event = express.Router();
event.use(authMiddleware);

event.get("/", getAllEvents);
event.get("/:id", getEventDetails);
event.post("/", createEvent);

module.exports = event;
