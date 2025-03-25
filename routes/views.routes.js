const { addViews, getViews, getByIdViews, updateViews, deleteViews } = require("../controller/views.controller")


const router = require("express").Router()

router.post("/", addViews)
router.get("/", getViews)
router.get("/:id", getByIdViews)
router.put("/:id", updateViews)
router.delete("/:id", deleteViews)


module.exports = router 