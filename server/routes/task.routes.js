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

    const task = new Task({
      counter: updateTaskCounter.value,
      owner: req.body.owner,
      description: req.body.description,
      assigned: req.body.assigned,
      articleImage: `${req.body.description}_${req.file.originalname}`,
      section: req.body.section,
      dateStart: Date.now(),
      dateEnd: req.body.dateEnd,
      dateUpdate: Date.now(),
      priority: req.body.priority,
      whoCheckedList: [],
      completed: req.body.completed,
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

//edit task
router.put("/edit/:id", async (req, res) => {
  try {
    const { id, description, assigned, dateUpdate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id },
      {
        description: description,
        assigned: assigned,
        dateUpdate: dateUpdate,
      }
    );

    await task.save();
    await res.json(await Task.findOne({ _id: id }));
  } catch (error) {
    console.log(error);
  }
});

//edit task status
router.put("/edit/status/:id", async (req, res) => {
  try {
    const { id, completed, dateUpdate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id },
      {
        completed: completed,
        dateUpdate: dateUpdate,
      }
    );

    await task.save();
    await res.json(await Task.findOne({ _id: id }));
  } catch (error) {
    console.log(error);
  }
});

//edit task destination
router.put("/edit/destination/:id", async (req, res) => {
  try {
    const { id, assigned, dateUpdate, userRole, whoCheckedList } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id },
      {
        assigned: assigned,
        dateUpdate: dateUpdate,
        whoCheckedList: [...whoCheckedList, userRole],
      }
    );

    await task.save();
    await res.json(await Task.findOne({ _id: id }));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
