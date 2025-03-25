const { addLikes, getLikes, getByIdLikes, updateLikes, deleteLikes } = require("../controller/likes.controller")


const router = require("express").Router()

router.post("/", addLikes)
router.get("/", getLikes)
router.get("/:id", getByIdLikes)
router.put("/:id", updateLikes)
router.delete("/:id", deleteLikes)


module.exports = router 