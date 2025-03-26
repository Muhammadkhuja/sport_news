const { addUser, getUser, getByIdUser, updateUser, deleteUser, login, logoutuser, refreshTokenUser } = require("../controller/user.controller")


const router = require("express").Router()

router.post("/", addUser)
router.get("/", getUser)
router.post("/login", login)
router.post("/logout", logoutuser)
router.post("/refresh", refreshTokenUser)

router.get("/:id", getByIdUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


module.exports = router 