const loginForm = document.getElementById("login-form");
const welcomeMessage = document.getElementById("welcome-message");

// Set Cookie Function
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Read Cookie Function
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

// * User Section
// ! Do NOT edit this section!
const users = [
  { username: "nadech.ta", password: "01527" },
  // Main User
  { username: "kpaos", password: "kpao.school" },
];

// Read the Cookie
let usernameFromCookie = getCookie("username"); // Store the result in a variable

// Check if the username from the cookie exists in the users array
let user = users.find((u) => u.username === usernameFromCookie);

if (user) {
  location.href = "./home.html";
} else {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setCookie("username", username, 14);
      location.href = "./home.html";
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
    }
  });
}

// * Referral System Section
// Get the parameters
const params = location.search;
// Get the Referral Code
const getQueryString = new URLSearchParams(params);
const referralCode = getQueryString.get("ref");

// Check if the referral code is correct
if (referralCode === "dJiDzv7lGIjcLf453EVbFay2SUOgMA") {
  setCookie("username", "kpaos", 1);
  location.href = "./home.html";
}
