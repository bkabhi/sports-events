const express = require("express");
const { createEvent, getAllEvents, getBookings } = require("../controllers");
const { getEventDetails } = require("../controllers/event.controller");
const { authMiddleware } = require("../middlewares/auth.midleware");

const event = express.Router();
event.use(authMiddleware);

//get all events
event.get("/", async (req, res) => {
  const { q = "", ...others } = req.query;
  try {
    let events = await getAllEvents(q, others);
    return res.send({ message: events.length ? "Events found" : "No events found", data: events });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//get one event details
event.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let event = await getEventDetails(id);
    let bookedCount = (await getBookings({ event: id, status: "Approved" })).length;
    return res.send({ message: "Events found", data: { ...event?.toObject(), bookedCount } });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

// to create new Event
event.post("/", async (req, res) => {
  console.log(res.body, " body data");
  let { title, description, image = "", category, schedule, playersLimit, userid, city } = req.body;

  // if (!title || !description || !schedule || !playersLimit)
  //   return res.status(400).send({ message: "Required Data missing" });

  try {
    let newEvent = await createEvent({
      title,
      description,
      image,
      schedule,
      category,
      playersLimit,
      city,
      organizer: userid,
    });
    return res.send({ message: "New Event Created", data: newEvent });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

module.exports = event;
