const {
  addTag,
  getTag,
  getByIdTag,
  updateTag,
  deleteTag,
} = require("../controller/tags.controller");

const router = require("express").Router();

router.post("/", addTag);
router.get("/", getTag);
router.get("/:id", getByIdTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;
