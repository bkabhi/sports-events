const { eventModel } = require("../models");
const { getBookings } = require("./booking.controller");

// to create new Event
const createEvent = async (req, res) => {
  console.log(res.body, " body data");
  let { title, description, image = "", category, schedule, playersLimit, userid, city } = req.body;

  if (!title || !playersLimit || !schedule)
    return res.status(400).send({ message: "Required Data missing" });
  try {
    let event = { title, description, image, category, schedule, playersLimit, city, organizer: userid };

    let newEvent = await eventModel.create(event);
    return res.send({ message: "New Event Created", data: newEvent });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
}

//get all events
const getAllEvents = async(req, res) => {
  const { q = "", ...others } = req.query;
  try {
    let events = await eventModel.aggregate([
      { $match: { $and: [{ title: { $regex: q, $options: "i" } }, { ...others }] } },
      { $unset: ["updatedAt", "createdAt", "__v"] },
    ]);
    return res.send({ message: events.length ? "Events found" : "No events found", data: events });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
}

//get event by id
const getEventDetails =  async (req, res) => {
  const { id } = req.params;
  try {
    let event = await eventModel.findById(id).populate("organizer", ["firstName", "lastName", "email"]);
    
    let bookedCount = await getBookings({ event: id, status: "Approved" });
    return res.send({ message: "Events found", data: { ...event?.toObject(), bookedCount: bookedCount.length } });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
}

module.exports = { createEvent, getAllEvents, getEventDetails };
