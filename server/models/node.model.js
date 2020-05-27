const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nodeSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  node_status: {
    type: String,
    default: "pending"
  },
  workflow: {
    type: Schema.Types.ObjectId,
    ref: "Workflow"
  }
})

module.exports = mongoose.model("node", nodeSchema);