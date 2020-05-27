const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workFlowSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  workflow_status: {
    type: String,
    default: "pending"
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  }
})

module.exports = mongoose.model("workflow", workFlowSchema);