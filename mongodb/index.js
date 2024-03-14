const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;


// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/localuserdb')
.then(() => {
  console.log('\nsuccessfully connected to local mongodb!')
})
.catch((err) => {
  console.log('\ncaught some error:',err)
})

// mongodb schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,

  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
}, { timestamps: true}
);

// defining model schema
const User = mongoose.model("user", userSchema);

// middleware
app.use(express.urlencoded({ extended: false }));

// homepage
app.get('/', (req, res) => {
  return res.send("homepage!")
})

// get all users
app.get("/users", async(req, res) => {
  const allUsers = await User.find({})
  const html = `
  <ul>
    ${allUsers.map(user => `<li>${user.firstName}</li>`).join("")}
  </ul>
  `
  res.send(html)
})


// get all users api 
app.get("/api/users/", async(req, res) => {
  const allDbUsers = await User.find({})
  return res.json(allDbUsers)
})

// adding users to db
app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({msg: 'all the fields are required'})
  }

  const createdUser = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  return res.status(201).json({ msg: 'new user created!' })
});

// fetch, update and delete a user in db
app.route("/api/users/:id")

// fetch a user
.get(async (req, res) => {
  const id = req.params.id;

  try {
    const fetchUser = await User.findById(id);
    return res.json({ user: fetchUser });
  } 
  
  catch (error) {
    return res.status(404).json({ error: "no such user found" });
  }
})

// update a user
.patch(async (req, res) => {
  const newBody = req.body;

  if (
    !newBody ||
    !newBody.firstName ||
    !newBody.lastName ||
    !newBody.email ||
    !newBody.gender ||
    !newBody.jobTitle
  ) {
    return res.status(400).json({msg: 'all the fields are required'})
  }

  console.log("\nnew user data:", newBody)

  await User.findByIdAndUpdate(req.params.id, newBody)
  
  return res.json({
    status: "new user updated"
  })
})

.delete(async (req, res) => {

  await User.findByIdAndDelete(req.params.id)
  
  return res.json({
    status: "user deleted successfully"
  })
})



app.listen(PORT, () => {
  console.log(`\nserver started on PORT: ${PORT}`)
})