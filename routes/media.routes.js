const { addMedia, getMedia, getByIdMedia, updateMedia, deleteMedia } = require("../controller/media.controller")


const router = require("express").Router()

router.post("/", addMedia)
router.get("/", getMedia)
router.get("/:id", getByIdMedia)
router.put("/:id", updateMedia)
router.delete("/:id", deleteMedia)


module.exports = router 