const { addNwlang, getNwlang, getByIdNwlang, updateNwlang, deleteNwlang } = require("../controller/nwlang.controller")


const router = require("express").Router()

router.post("/", addNwlang)
router.get("/", getNwlang)
router.get("/:id", getByIdNwlang)
router.put("/:id", updateNwlang)
router.delete("/:id", deleteNwlang)


module.exports = router 