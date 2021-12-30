const express = require("express")
const router = express.Router()
const favoritController = require("../controllers/favorits")

// midlle ware of authantification using json web token :
const access = require("../midllewares/userAuth")

// apis :

router.post("/addFavorit", access, favoritController.addFavorit)

router.get("/listFavorit/:id", access, favoritController.getFavoritsByID)

module.exports = router