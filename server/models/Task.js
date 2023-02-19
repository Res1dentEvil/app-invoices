const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  counter: Number,
  owner: { type: Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  assigned: { type: String, required: true },
  articleImage: { type: String, required: true },
  section: { type: String, required: true },
  dateStart: { type: Date, default: Date.now() },
  dateEnd: { type: Date },
  dateUpdate: { type: Date },
  priority: { type: String, required: true },
  whoCheckedList: [{ type: String }],
  completed: String,
});

module.exports = model("Task", schema);
