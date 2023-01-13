var express = require("express");
var router = express.Router();

/* Service bus set up */
const {ServiceBusClient} = require("@azure/service-bus");

const connectionString =
  "Endpoint=sb://rl-servicebus01.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=XVU4KSHE97BjiwsAELrmn0OxsdQV7W60CLdrn/Uq1G8=";
const topicName = "appointmentstopic";

/* POST virtual appointment form*/
router.post("/submit", function (req, res, next) {
  const submitedform = req.body;
  console.log(submitedform);

  // call the main function
  sendToTopic({body: submitedform}).catch((err) => {
    console.log("Error occurred: ", err);
    process.exit(1);
  });

  res.send(`Sent to the topic: ${topicName}`);
});

async function sendToTopic(messsage) {
  // create a Service Bus client using the connection string to the Service Bus namespace
  const sbClient = new ServiceBusClient(connectionString);

  // createSender() can also be used to create a sender for a queue.
  const sender = sbClient.createSender(topicName);

  try {
    // Tries to send the message in a single batch.
    // Will fail if the message cannot fit in a batch.

    // create a batch object
    let batch = await sender.createMessageBatch();

    if (!batch.tryAddMessage(messsage)) {
      // if the message can't be added to the batch, the message is probably too big to fit in a batch
      throw new Error("Message too big to fit in a batch");
    }

    // Send the created batch of messages to the topic
    await sender.sendMessages(batch);

    console.log(`Sent to the topic: ${topicName}`);

    // Close the sender
    await sender.close();
  } finally {
    await sbClient.close();
  }
}

module.exports = router;
