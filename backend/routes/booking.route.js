const express = require("express");
const { getBookings, createBooking, getApprovedBookingUsers, pendingBookings, updateBooking } = require("../controllers");
const { authMiddleware } = require("../middlewares/auth.midleware");

const booking = express.Router();
booking.use(authMiddleware);

//get users bookings
booking.get("/", async (req, res) => {
  const { userid, ...others } = req.body;
  try {
    let bookings = await getBookings({ requester: userid, ...others });
    return res.send({
      message: bookings.length ? "Bookings found" : "No bookings found",
      data: bookings,
    });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//get bookings or pendings for user approval
booking.get("/pendingBookings", async (req, res) => {
  const { userid } = req.body;
  console.log(userid);
  try {
    let bookings = await pendingBookings(userid);
    console.log(bookings, "Bookings pending for user approval");
    return res.send({ message: "Pending Booking", data: bookings });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//get all approved user list of an event if you user itself apporved.
booking.get("/:eventid", async (req, res) => {
  const { userid } = req.body;
  const { eventid } = req.params;
  try {
    let players = await getApprovedBookingUsers({ requester: userid, eventid });
    console.log(players, 'players');
    return res.send({ message: players.length ? "Approved Players" : "No player", data: players });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//create booking
booking.post("/", async (req, res) => {
  const { userid, event } = req.body;
  try {
    let book = await createBooking({ requester: userid, event });
    return res.send({ message: "Booking Created", data: book });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//update(approve/reject) booking
booking.patch("/:bookingId", async (req, res) => {
  const { status } = req.body;
  const { bookingId } = req.params;
  try {
    let book = await updateBooking(bookingId, {
      status: status === "Accept" ? "Approved" : "Rejected",
    });
    return res.send({ message: "Booking updated", data: book });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

module.exports = booking;
