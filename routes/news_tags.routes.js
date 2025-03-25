const {
  addNewstag,
  getNewstag,
  getByIdNewstag,
  updateNewstag,
  deleteNewstag,
} = require("../controller/news_tags.controller");

const router = require("express").Router();

router.post("/", addNewstag);
router.get("/", getNewstag);
router.get("/:id", getByIdNewstag);
router.put("/:id", updateNewstag);
router.delete("/:id", deleteNewstag);

module.exports = router;
