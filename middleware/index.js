const express = require("express");
const app = express();
const PORT = 3000;

app.use((req, res, next) =>{
  console.log("executing middleware 1")
  req.myUsername = 'abhijay'
  next();
})


app.use((req, res, next) =>{
  console.log("executing middleware 2")
  req.myPassword = 'rajvansh@2711'
  next();
})


app.use((req, res, next) =>{
  console.log("executing middleware 3, and data from m1 and m2...")
  console.log(`username: ${req.myUsername}, password: ${req.myPassword}`)
  next()
})


app.get('/', (req, res) => {
  return res.send("homepage!")
})

app.listen(PORT, () => {
  console.log(`server started on PORT: ${PORT}`)
})