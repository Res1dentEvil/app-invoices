const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: Types.ObjectId, ref: "Task" }],
  roles: [{ type: String, ref: "Role" }],
  avatar: { type: String },
});

module.exports = model("User", schema);
