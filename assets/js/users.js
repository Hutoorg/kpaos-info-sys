function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Read Cookie
let username = getCookie("username");

// * User Section
// Get Users
async function getUsersRaw() {
  const usersDbResponse = await fetch("./assets/json/users.json");
  const usrs = await usersDbResponse.json();
  return usrs;
}

// Init variable
var users;

// Extract
getUsersRaw()
  .then((usrs) => {
    const users = usrs;
    return users;
  })
  .catch((error) => {
    console.error(error);
  });

// Init from extract
async function check() {
  let users = await getUsersRaw();

  // Check if the username from the cookie exists in the users array
  let user = users.find((u) => u.username === username);

  if (user) {
    console.log(user);
    // Check if 'user' is defined
    document.getElementById("name").innerHTML = "สวัสดี " + user.name;
    console.log(user.profilePic);
    document.getElementById("profileImg").src = user.profilePic;
  } else {
    location.href = "./";
    console.log("User not found");
  }
}

check();

// * Logout
function logout() {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.href = "./";
}
//* Referral System

if (username != "kpaos") {
  document.getElementById("qrInv").src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://kpaos-infosys.netlify.app/?dJiDzv7lGIjcLf453EVbFay2SUOgMA&utm_source=" +
    username +
    "&utm_medium=qrcode_user&utm_campaign=entrance_m1_2023_r2";
} else {
  document.getElementById("inv").innerHTML = "";
}
