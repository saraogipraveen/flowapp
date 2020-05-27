const router = require("express").Router();
const Workflow = require("../models/workflow.model");
const isAuthorized = require("../middlewares/auth");

/**
 * @path /api/workflow/read
 * @access Public
 * @method POST
 */

router.post("/read", isAuthorized, async (req, res) => {
  let userId = req.body.user;
  let workflows = await Workflow.find({creator: userId});

  if(workflows) {
    return res.status(200).json({
      message: "workflows",
      workflows
    });
  }
})

/**
 * @path /api/workflow/create
 * @access Public
 * @method POST
 */

router.post("/create", isAuthorized, async (req, res) => {
  try {
    const { user: userId, workflowName } = req.body;
    
    let newWorkflow = new Workflow({
      name: workflowName,
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
 * @path /api/workflow/delete
 * @access Public
 * @method POST
 */

router.delete("/delete", isAuthorized, async (req, res) => {
    try {
    const { workflowId } = req.query;
    
    let result = await Workflow.deleteOne({_id: workflowId});

    if(res)
      return res.status(204).json({
        message: "Workflow deleted successfully. 😊",
        result
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
