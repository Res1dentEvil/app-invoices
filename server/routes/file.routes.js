const { Router } = require("express");
const router = new Router();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const config = require("config");

cloudinary.config({
  cloud_name: config.get("cloud_name"),
  api_key: config.get("api_key"),
  api_secret: config.get("api_secret"),
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("uploadFile"), async (req, res) => {
  // return res.json({ uploadFile: req.file.path });
  return res.json(req.file);
});

router.post("/delete", async (req, res) => {
  try {
    const { fileName } = req.body;
    await cloudinary.uploader.destroy(`${fileName}`, function (error, result) {
      console.log(result, error);
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
