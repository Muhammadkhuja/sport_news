const { addreports, getreports, getByIdreports, updatereports, deletereports } = require("../controller/reports.controller")


const router = require("express").Router()

router.post("/", addreports)
router.get("/", getreports)
router.get("/:id", getByIdreports)
router.put("/:id", updatereports)
router.delete("/:id", deletereports)


module.exports = router 