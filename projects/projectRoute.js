const express = require("express");

const router = express.Router();

const db = require("../data/helpers/projectModel");

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
  const { name, description, completed } = req.body;
  const project = {
    name: name,
    description: description,
    completed: completed
  };
  try {
    const data = await db.insert(project);
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await db.remove(req.params.id);
    res.status(204).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.put("/:id", async (req, res) => {
  const changes = req.body;
  try {
    const data = await db.update(req.params.id, changes);
    res.status(202).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const data = await db.getProjectActions(req.params.id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = router;
