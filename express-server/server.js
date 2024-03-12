const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  return res.send("homepage")
})

app.get("/about", (req, res) => {
  return res.send("about")
})


app.listen(PORT, () => {
  console.log(`server started on ${PORT}...`)
}) 