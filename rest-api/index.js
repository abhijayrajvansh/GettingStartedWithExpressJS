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

app.route('/api/users/:id')

.get((req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user)
})

.patch((req, res) => {
  // todo: edit a user
  return res.json({status: "pending"})
})

.delete((req, res) => {
  // todo: delete a user
  return res.json({status: "pending"})
})


app.post("/api/users", (req, res) => {
  // todo: create new user
  return res.json({status: "pending"})
})

app.listen(PORT, () =>{
  console.log(`server started on ${PORT}...`)
})