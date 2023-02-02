const { Router } = require("express");
const router = new Router();
const Task = require("../models/Task");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, "./client/public/uploads/");
    callback(null, "../client/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("articleImage"), async (req, res) => {
  try {
    const task = new Task({
      owner: req.body.owner,
      description: req.body.description,
      articleImage: req.file.originalname,
      section: req.body.section,
      dateStart: Date.now(),
      dateEnd: null,
      priority: req.body.priority,
      whoCheckedList: [],
      completed: false,
    });
    console.log("----TASK WAS CREATED-----");
    await task.save();
    await res.json(task);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
