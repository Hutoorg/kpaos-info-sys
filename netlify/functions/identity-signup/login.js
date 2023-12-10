const bcrypt = require("bcrypt");
const { setCookie, getCookie } = require("./utils");
const users = require("../users.json"); // Adjust the path accordingly

exports.handler = async function (event, context) {
  const { username, password } = JSON.parse(event.body);

  const user = users.find((u) => u.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    // Password is correct
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully logged in!" }),
    };

    // Set a cookie in the response
    setCookie(response, "username", username, 14);

    return response;
  } else {
    // Invalid username or password
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid username or password" }),
    };
  }
};
