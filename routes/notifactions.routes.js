const {
  addNotifaction,
  getNotifaction,
  getByIdNotifaction,
  updateNotifaction,
  deleteNotifaction,
} = require("../controller/notifactions.controller");

const router = require("express").Router();

router.post("/", addNotifaction);
router.get("/", getNotifaction);
router.get("/:id", getByIdNotifaction);
router.put("/:id", updateNotifaction);
router.delete("/:id", deleteNotifaction);

module.exports = router;
