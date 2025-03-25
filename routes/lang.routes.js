const { addLang, getLang, getByIdLang, updateLang, deleteLang } = require("../controller/langs.controller")

const router = require("express").Router()

router.post("/", addLang)
router.get("/", getLang)
router.get("/:id", getByIdLang)
router.put("/:id", updateLang)
router.delete("/:id", deleteLang)


module.exports = router 