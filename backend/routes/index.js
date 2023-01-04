const express = require("express");
const userRouter = require("./user.routes");
const eventRouter = require("./event.routes");
const bookingRouter = require("./booking.routes");

const router = express.Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/booking", bookingRouter);

module.exports = router;