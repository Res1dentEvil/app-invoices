const { Router } = require("express");
const router = new Router();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dsg2tfmxt",
  api_key: "958827445655684",
  api_secret: "TSy-IjpsqEOt0vAwIlSG84tw-GI",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("uploadFile"), async (req, res) => {
  return res.json({ uploadFile: req.file.path });
});

module.exports = router;
