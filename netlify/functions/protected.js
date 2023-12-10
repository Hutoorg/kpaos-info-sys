const { getCookie } = require("./utils");

exports.handler = function (event, context) {
  const username = getCookie(event, "username");

  if (username) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Welcome, ${username}! This is protected content.`,
      }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized. Please log in." }),
    };
  }
};
