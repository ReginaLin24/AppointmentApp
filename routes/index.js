var express = require("express");
const path = require("path");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

router.get("/style.css", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/views/style.css"));
});

module.exports = router;
