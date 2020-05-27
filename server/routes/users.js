const router = require('express').Router();

let User = require('../models/user.model');

/**
 * @path /api/users/register
 * @access Public
 * @method POST
 */
router.post("/register",  (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("req.body cnother", req.body)
        return res.send('hahah');
      
    } catch (error) {
      console.log(error);
    }
  });


module.exports = router;