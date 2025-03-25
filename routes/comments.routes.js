const { addComment, getComment, getByIdComment, updateComment, deleteComment } = require("../controller/comments.controller")


const router = require("express").Router()

router.post("/", addComment)
router.get("/", getComment)
router.get("/:id", getByIdComment)
router.put("/:id", updateComment)
router.delete("/:id", deleteComment)


module.exports = router 