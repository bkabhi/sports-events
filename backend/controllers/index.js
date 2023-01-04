const { getTokens, getAccessToken, getRefreshToken } = require("./jwt.controller");
const { login, register, refreshToken } = require("./user.controller");
const { createEvent, getAllEvents } = require("./event.controller");
const { getBookings, createBooking, updateBooking, getApprovedBookingUsers, pendingBookings, } = require("./booking.controller");

module.exports = {
  getTokens, getAccessToken, 
  getRefreshToken, 
  register,
  login, 
  refreshToken,
  createEvent,
  getAllEvents, getBookings,
  createBooking, updateBooking,
  getApprovedBookingUsers,
  pendingBookings,
};
