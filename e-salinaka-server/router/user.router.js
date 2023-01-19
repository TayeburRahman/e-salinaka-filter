const { createUsers, getUsers, getAllUsers } = require("../controllers/user.controllers");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.route('/signup').post(createUsers);
router.route('/login').post(getUsers);
router.route('/getByAllUser').get(verifyToken,getAllUsers);

module.exports = router;