const { addCategory, getCategory, getByIdCategory, updateCategory, deleteCategory } = require("../controller/category.controller")

const router = require("express").Router()

router.post("/", addCategory)
router.get("/", getCategory)
router.get("/:id", getByIdCategory)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)


module.exports = router 