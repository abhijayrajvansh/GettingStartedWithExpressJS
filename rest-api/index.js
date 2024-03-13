const express = require("express")
const PORT = 3000;
const app = express();
const users = require("./users_db.json")

app.get("/", (req, res) =>{
  res.send('average homepage')
})

app.get("/users", (req, res) => {
  const html = `
  <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `
  res.send(html)
})



app.get('/api/users', (req, res) => {
  return res.json(users)
})







app.listen(PORT, () =>{
  console.log(`server started on ${PORT}...`)
})