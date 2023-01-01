const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    title: { type: String },
    playersLimit: { type: Number },
    description: { type: String },
    image: { type: String },
    city: {
      type: String,
      enums: ["Bangalore", "Chennai", "Patna"],
    },
    category: {
      type: String,
      required: true,
      enums: ["Badminton", "Football", "Cricket"],
    },
    schedule: { type: String }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

eventSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;
