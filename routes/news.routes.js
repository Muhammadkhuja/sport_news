const { addNews, getNews, getByIdNews, updateNews, deleteNews } = require("../controller/news.controller")


const router = require("express").Router()

router.post("/", addNews)
router.get("/", getNews)
router.get("/:id", getByIdNews)
router.put("/:id", updateNews)
router.delete("/:id", deleteNews)


module.exports = router 