const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;

const usersFile = "users.json";

// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON in the request body
app.use(bodyParser.json());
// Middleware to parse cookies
app.use(cookieParser());

// Read user data from the JSON file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading users file: ${error.message}`);
    return [];
  }
}

// Write user data to the JSON file
function writeUsers(users) {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error(`Error writing users file: ${error.message}`);
  }
}

// Set Cookie function
function setCookie(res, cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

  // Replace 'expires' with 'maxAge'
  res.cookie(cname, cvalue, {
    maxAge: exdays * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

// Read Cookie Function
function getCookie(req, cname) {
  return req.cookies[cname] || "";
}

// Initialize users
let users = readUsers();

// Express route for handling login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    // Password is correct
    setCookie(res, "username", username, 14);
    res.status(200).json({ message: "Successfully logged in!" });
  } else {
    // Invalid username or password
    res.status(401).json({ error: "Invalid username or password" });
  }
});

// Express route for handling registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    // User already exists
    res.status(400).json({ error: "Username already taken" });
  } else {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user
    users.push({ username, password: hashedPassword });
    writeUsers(users);

    // Log in the user and set the cookie
    setCookie(res, "username", username, 14);

    res.status(201).json({ message: "User registered successfully" });
  }
});

// Express route for accessing protected content
app.get("/protected", (req, res) => {
  const username = getCookie(req, "username");

  if (username) {
    res
      .status(200)
      .json({ message: `Welcome, ${username}! This is protected content.` });
  } else {
    res.status(401).json({ error: "Unauthorized. Please log in." });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
