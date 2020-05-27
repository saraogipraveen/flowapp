const router = require("express").Router();
const Node = require("../models/node.model");
const isAuthorized = require("../middlewares/Auth");

/**
 * @path /api/node/create
 * @access Public
 * @method POST
 */
router.get("/read/:workflowId", isAuthorized, async (req, res) => {
  try {
    const { workflowId } = req.params;

    const result = await Node.find({workflow: workflowId});

    return res.status(200).json({
      data: result
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @path /api/node/create
 * @access Public
 * @method POST
 */
router.post("/create", isAuthorized, async (req, res) => {
  try {
    const { workflowId, nodeTitle  } = req.body;

    let newNode = new Node({
      title: nodeTitle,
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





module.exports = router;
