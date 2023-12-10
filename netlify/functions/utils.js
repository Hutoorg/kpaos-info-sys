// Your utility functions here

function setCookie(response, cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);

  // Replace 'expires' with 'maxAge'
  response.headers = {
    ...response.headers,
    "Set-Cookie": `${cname}=${cvalue}; Max-Age=${
      exdays * 24 * 60 * 60 * 1000
    }; Path=/`,
  };
}

function getCookie(event, cname) {
  const cookies = event.headers && event.headers.cookie;

  if (cookies) {
    const cookieArray = cookies.split("; ");
    for (const cookie of cookieArray) {
      const [name, value] = cookie.split("=");
      if (name === cname) {
        return value;
      }
    }
  }

  return "";
}

module.exports = { setCookie, getCookie };
