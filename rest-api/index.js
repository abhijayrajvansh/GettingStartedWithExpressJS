const express = require("express")
const PORT = 3000;
const fs = require("fs")
const app = express();
const users = require("./users_db.json")

// middleware
app.use(express.urlencoded({ extended: false }));

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
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...req.body }; 
    // Merge existing user data with the updated data
    return res.json({ status: "success", message: "User updated successfully" });
  } else {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
})

.delete((req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1); 
    // Remove the user from the array
    return res.json({ status: "success", message: "User deleted successfully" });
  } else {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
});


app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("\nnew user request received:\n\n", body)
  users.push({id: users.length + 1, ...body})

  fs.writeFile("./users_db.json", JSON.stringify(users), (err, data) => {
    return res.json({status: "new user added", id: users.length})
  })
})

app.listen(PORT, () =>{
  console.log(`server started on ${PORT}...`)
})