const { Router } = require("express");
const router = new Router();
const Task = require("../models/Task");
const TaskCounter = require("../models/TaskCounter");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${req.body.description}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("articleImage"), async (req, res) => {
  try {
    const currentTaskCounter = await TaskCounter.find({});
    const updateTaskCounter = await TaskCounter.findOneAndUpdate(
      {
        _id: currentTaskCounter[0]._id,
      },
      { value: currentTaskCounter[0].value + 1 }
    );
    await updateTaskCounter.save();
    // console.log(updateTaskCounter);

    const task = new Task({
      counter: updateTaskCounter.value,
      owner: req.body.owner,
      description: req.body.description,
      assigned: req.body.assigned,
      articleImage: `${req.body.description}_${req.file.originalname}`,
      section: req.body.section,
      dateStart: Date.now(),
      dateUpdate: Date.now(),
      priority: req.body.priority,
      whoCheckedList: [],
      completed: false,
    });
    await task.save();
    await res.json(task);
  } catch (error) {
    console.log(error);
  }
});

//all tasks
router.get("/", async (req, res) => {
  try {
    //const { userId } = req.query
    const tasks = await Task.find({});
    await res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

//task by id
router.get("/:id", async (req, res) => {
  try {
    // const { id } = req.body;
    const task = await Task.findOne({ _id: req.params.id });
    await res.json(task);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
