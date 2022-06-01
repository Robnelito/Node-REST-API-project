const express = require("express");
const router = express.Router();
const entreprises = require("../services/entreprises");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await entreprises.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting entreprise `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await entreprises.create(req.body));
  } catch (err) {
    console.error(`Error while creating entreprise`, err.message);
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    res.json(await entreprises.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating entreprise`, err.message);
    next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await entreprises.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting entreprise`, err.message);
    next(err);
  }
});

module.exports = router;
