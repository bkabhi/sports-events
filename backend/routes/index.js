const express = require("express");
const userRouter = require("./user.route");
const eventRouter = require("./event.route");
const bookingRouter = require("./booking.route");

const router = express.Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/booking", bookingRouter);

module.exports = router;