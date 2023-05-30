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

  //read the user name cookie
  const userName = req.cookies.username;
  var userKey;
  if (userName == "" || userName == undefined || userName == null) {
    userKey = "anonymous";
  } else {
    userKey = userName;
  }
  console.log(userKey);

  let isNewDataField = await client.variation(
    "newDataField",
    {key: userKey},
    false
  );
  let isDoctorView = await client.variation(
    "showDoctorView",
    {key: userKey},
    false
  );

  console.log("isNewDataField = " + isNewDataField);
  console.log("isDoctorView = " + isDoctorView);

  if (isNewDataField) {
    res.sendFile(path.join(__dirname, "/views/dataFieldIndex.html"));
    return;
  }

  if (isDoctorView) {
    res.sendFile(path.join(__dirname, "/views/docIndex.html"));
    return;
  }

  res.sendFile(path.join(__dirname, "/views/index.html"));
});

router.post("/login", function (req, res, next) {
  const {username} = req.body;
  console.log(username);

  // Set the username as a cookie
  res.cookie("username", username);

  res.sendStatus(200);
});

router.get("/style.css", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/views/style.css"));
});

module.exports = router;
