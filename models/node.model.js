const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nodeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  node_status: {
    type: String,
    default: "pending"
  },
  desc: {
    type: String,
  },
  workflow: {
    type: Schema.Types.ObjectId,
    ref: "workflow"
  }
})

module.exports = mongoose.model("node", nodeSchema);