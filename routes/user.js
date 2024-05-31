const { Router } = require("express");
const { getAllUsers, getUser } = require("../controllers/user");
const { protect } = require("../controllers/auth");

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", protect, getUser);

module.exports = router;
