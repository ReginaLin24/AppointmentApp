var express = require("express");
const path = require("path");
var router = express.Router();
const LaunchDarkly = require("launchdarkly-node-server-sdk");
const {log} = require("console");
require("dotenv").config();

/* GET home page. */
router.get("/", async (req, res, next) => {
  // res.render('index', { title: 'Express' });
  // res.sendFile(path.join(__dirname, "/views/index.html"));

  // try {
  const client = LaunchDarkly.init("sdk-7a4f697c-6712-4a70-8716-6d9e3ca2719f");
  await client.waitForInitialization();
  // } catch (error) {
  //   const errorString = JSON.stringify(error);
  //   res.send(errorString);
  //   return;
  // }

  let showFeature = await client.variation(
    "newDataField",
    {key: "anonymous"},
    false
  );
  if (showFeature) {
    res.sendFile(path.join(__dirname, "/views/newIndex.html"));
    return;
  }
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

router.get("/style.css", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/views/style.css"));
});

module.exports = router;
