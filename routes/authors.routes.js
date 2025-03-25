const {
  addAuthor,
  getAuthor,
  getByIdAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controller/authors.controller");

const router = require("express").Router();

router.post("/", addAuthor);
router.get("/", getAuthor);
router.get("/:id", getByIdAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

module.exports = router;
