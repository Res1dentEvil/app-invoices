const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const authRouter = require("./routes/auth.routes");
const taskRouter = require("./routes/task.routes");
const fileRouter = require("./routes/file.routes");

const app = express();

const PORT = process.env.PORT || config.get("serverPort");
const corsMiddleware = require("./middleware/cors.middleware");

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/file", fileRouter);

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"));
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}...`);
    });
  } catch (e) {}
};

start();
