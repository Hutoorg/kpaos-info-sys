const bcrypt = require("bcrypt");
const { writeUsers, readUsers, setCookie } = require("./utils");
let users = readUsers(); // Move it inside the function

exports.handler = async function (event, context) {
  const { username, password } = JSON.parse(event.body);

  const existingUser = users.find((u) => u.username === username);

  if (existingUser) {
    // User already exists
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Username already taken" }),
    };
  } else {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user
    users.push({ username, password: hashedPassword });
    writeUsers(users);

    // Log in the user and set the cookie
    const response = {
      statusCode: 201,
      body: JSON.stringify({ message: "User registered successfully" }),
    };

    setCookie(response, "username", username, 14);

    return response;
  }
};
