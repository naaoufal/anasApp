const express = require("express")
const router = express.Router()
const userController = require("../controllers/users")

// midlle ware of authantification using json web token :
const access = require("../midllewares/userAuth")

// apis :

router.post("/authUser", userController.userAuth)

router.get("/getUsers", access, userController.getUsers)

router.post("/createUser", userController.postUser)

// auth with keycloak :

router.post("/keycloak", userController.authKeycloak)

router.post("/createUserKeycloak", userController.createUserWithKeycloak)

module.exports = router