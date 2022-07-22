const express = require("express");

const router = express.Router();

// routes
router.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "index todo route" });
  } catch (err) {
    res.status(500).json({ msg: `error in get todos ${err}` });
  }
});

router.post("/", (req, res) => {
  try {
    res.status(201).json({ msg: "create successfully" });
  } catch (err) {
    res.status(500).json({ msg: `error in post todos ${err}` });
  }
});

router.get("/:id", (req, res) => {
  try {
    res.status(200).json({ msg: "get todo with id" });
  } catch (err) {
    res.status(500).json({ msg: `error in get todo id ${err}` });
  }
});

router.put("/:id", (req, res) => {
  try {
    res.status(200).json({ msg: "update todo with id" });
  } catch (err) {
    res.status(500).json({ msg: `error in update todo ${err}` });
  }
});

router.delete("/:id", (req, res) => {
  try {
    res.status(200).json({ msg: "delete todo with id" });
  } catch (err) {
    res.status(500).json({ msg: `error in delete todo ${err}` });
  }
});

module.exports = router;
