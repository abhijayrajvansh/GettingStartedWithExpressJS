const http = require("http")
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("homepage")
})

app.get("/about", (req, res) => {
  return res.send("about")
})


const server = http.createServer(app)

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`server started on ${PORT}...`)
})