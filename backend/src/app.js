const express = require("express");
const dotenv = require("dotenv").config();
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: `${process.env.FRONTEND_URI}`,
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/ai", aiRoutes);

module.exports = app;
