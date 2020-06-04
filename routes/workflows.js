const router = require("express").Router();
const Workflow = require("../models/workflow.model");
const isAuthorized = require("../middlewares/auth");


/**
 * @path workflows/create
 * @access Public
 * @method POST
 */

router.post("/create", isAuthorized, async (req, res) => {
  try {
    const { userId } = req.body;

    let newWorkflow = new Workflow({
      name: 'workflow Name',
      creator: userId
    });

    let createdWorkflow = await newWorkflow.save();

    return res.status(201).json({
      message: "Workflow created successfully. 😊",
      workflow: createdWorkflow
    });
  } catch (error) {
    console.log(error);
  }
});



/**
 * @path workflows/read
 * @access Public
 * @method POST
 */

router.post("/read", isAuthorized, async (req, res) => {
  let {userId} = req.body;
  let workflows = await Workflow.find({ creator: userId });

  if (workflows) {
    return res.status(200).json({
      message: "workflows",
      workflows
    });
  }
})


/**
 * @path workflows/update
 * @access Public
 * @method POST
 */

router.post("/update", isAuthorized, async (req, res) => {
  try {
    const { id, status, name } = req.body;

    Workflow.findOneAndUpdate({ _id : id }, { workflow_status: status, name }, { new: true }, function (data) {
      console.log(data)
    })

    if (res)
      return res.status(200).json({
        message: "Workflow Updated successfully. 😊",
      });
  } catch (error) {
    console.log(error);
  }
});



/**
 * @path workflows/delete
 * @access Public
 * @method POST
 */

router.delete("/delete", isAuthorized, async (req, res) => {
  try {
    const { workflowId } = req.body;

    let result = await Workflow.deleteOne({ _id: workflowId });

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
