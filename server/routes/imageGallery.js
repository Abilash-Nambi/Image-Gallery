const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadImage");
let images = [];

router.get("/", (req, res) => {
  res.status(200).json(images);
});

router.post("/upload", upload.single("upload_file"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "Image is required" });
  }
  images.push(file);
  res.status(200).json({ message: "image uploaded ", data: file });
});

module.exports = router;
