const express = require("express");
const images = require("./data");

const router = express.Router();

function isValidItem(item) {
  if (!item) {
    return false;
  }
  if (!item.author) {
    return false;
  }
  if (
    !item.frames &&
    !Array.isArray(item.frames) &&
    item.frames.every(frame => frame.match(/^[01]{49}$/))
  ) {
    return false;
  }
  return true;
}

router.get("/images", (req, res) => {
  const { author } = req.query;
  images.all(author, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.post("/images", (req, res) => {
  const item = req.body;
  if (!isValidItem(item)) {
    res.status(400);
  }
  images.create(item, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send();
    }
  });
});

module.exports = router;
