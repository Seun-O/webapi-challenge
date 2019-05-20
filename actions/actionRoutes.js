const express = require("express");

const router = express.Router();

const db = require("../data/helpers/actionModel");
const dbProjects = require("../data/helpers/projectModel");

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

router.delete("/:id", async (req, res) => {
  try {
    const data = await db.remove(req.params.id);
    res.status(204).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.post("/", async (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  try {
    const project = await dbProjects.get(project_id);
    if (!project) {
      res.status(404).json({
        message: "Project doesn't exist. Please input correct project number"
      });
    }
    const data = await db.insert({ project_id, description, notes, completed });
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.put("/:id", async (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  try {
    const project = await dbProjects.get(project_id);
    if (!project) {
      res.status(404).json({
        message: "Project doesn't exist. Please input correct project number"
      });
    }
    const data = await db.update(req.params.id, {
      project_id,
      description,
      notes,
      completed
    });
    res.status(201).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = router;
