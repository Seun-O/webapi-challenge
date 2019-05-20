const express = require("express");

const router = express.Router();

const db = require("../data/helpers/actionModel");

router.get("/", async (req, res) => {
  try {
    const data = await db.get();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await db.get(req.params.id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.post("/", async (req, res) => {
  const { description, notes, completed } = req.body;
  const action = {
    project_id: 1,
    description: description,
    notes: notes,
    completed: completed
  };
  try {
    const data = await db.insert(action);
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = router;
