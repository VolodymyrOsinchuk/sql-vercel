const { Router } = require("express");
const { getAllUsers, getUser } = require("../controllers/user");

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);

module.exports = router;
