const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "Pending",
      enums: ["Pending", "Approved", "Rejected", "Expired", "Cancelled"],
    },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "event", required: true },
  },
  { 
    timestamps: true, 
    versionKey: false 
  }
);

bookingSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = bookingModel;
