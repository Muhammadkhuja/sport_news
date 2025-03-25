const { addUser, getUser, getByIdUser, updateUser, deleteUser } = require("../controller/user.controller")


const router = require("express").Router()

router.post("/", addUser)
router.get("/", getUser)
router.get("/:id", getByIdUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


module.exports = router 