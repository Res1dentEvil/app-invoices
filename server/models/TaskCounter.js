const { Schema, model } = require("mongoose");

const TaskCounter = new Schema({
  value: { type: Number, unique: true },
});

module.exports = model("TaskCounter", TaskCounter);
