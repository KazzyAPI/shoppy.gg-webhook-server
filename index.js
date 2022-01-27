/** @format */

const express = require("express");
const colors = require("colors");
const { port, webhook_id, webhook_token } = require("./config.json");
const { MessageEmbed, Client, WebhookClient } = require("discord.js");
// Requires

const app = express();
app.use(express.json());
// Express setup

app.post("/", (req, res) => {
  try {
    console.log(
      colors.green("[+]") + " Received a webhook request from shoppy.gg!"
    );
    let data = req.body.data.product;
    let embed = new MessageEmbed()
      .setTitle(`Order for: ${data.title}`)
      .setDescription(`${data.description}`)
      .addField("Price", `${data.price}`, true)
      .addField("Created at", `${data.created_at}`, true)
      .setColor("#0099ff")
      .setFooter("Shoppy.gg")
      .setTimestamp();
    let hook = new WebhookClient(webhook_id, webhook_token);
    hook.send(embed);
    res.status(200).send();
  } catch (err) {
    console.log(colors.red("[-]") + " Error: " + err.message);
    res.status(500).send(err.message);
  }
});
app.listen(port, () =>
  console.log(colors.green("[+]") + ` Listening on port ${port}`)
);
