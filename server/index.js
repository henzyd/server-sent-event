const express = require("express");
const app = express();
const moment = require("moment");

const port = 8000;

app.get("/", (req, res) => {
  console.log("GET /");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const intervalid = setInterval(() => {
    const data = new Date().toISOString();

    res.write(`data: ${moment(data).format("YYYY-MM-DD HH:mm:ss")}\n\n`);
  }, 5000);

  res.on("close", () => {
    console.log("Connection closed");
    clearInterval(intervalid);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
