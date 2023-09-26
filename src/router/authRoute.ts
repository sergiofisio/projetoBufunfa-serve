const route = require("express").Router();
const { uploadImg } = require("../controllers/upload");
const multer = require("../middleware/multer");

route.post("/upload/:id/:table", multer.single("image"), uploadImg)

module.exports = route;