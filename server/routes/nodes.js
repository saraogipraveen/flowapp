const router = require("express").Router();
const Node = require("../models/node.model");
const Workflow = require("../models/workflow.model");
const isAuthorized = require("../middlewares/Auth");

/**
 * @path /node/create
 * @access Public
 * @method POST
 */
router.get("/read/:workflowId", isAuthorized, async (req, res) => {
  try {
    const { workflowId } = req.params;

    const nodes = await Node.find({ workflow: workflowId });
    const workflow = await Workflow.findById(workflowId)

    return res.status(200).json({
      data: { ...workflow._doc, nodes }
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @path /node/create
 * @access Public
 * @method POST
 */
router.post("/create", isAuthorized, async (req, res) => {
  try {
    const { workflowId } = req.body;

    let newNode = new Node({
      title: 'New Node',
      workflow: workflowId,
    });

    let resData = await newNode.save();

    res.status(201).json({
      message: "Node Successfully Created. 😊",
      data: resData,
    });
  } catch (error) {
    console.log(error);
  }
});


/**
 * @path nodes/delete
 * @access Public
 * @method POST
 */

router.delete("/delete", isAuthorized, async (req, res) => {
  try {
    const { nodeId } = req.body;

    let result = await Node.deleteOne({ _id: nodeId });

    if (res)
      return res.status(204).json({
        message: "Workflow deleted successfully. 😊",
        result
      });
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
