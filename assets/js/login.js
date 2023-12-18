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

// Read the Cookie
let usernameFromCookie = getCookie("username"); // Store the result in a variable

// Init from extract
async function login() {
  let users = await getUsersRaw();

  // Check if the username from the cookie exists in the users array
  let user = users.find((u) => u.username === usernameFromCookie);

  if (user) {
    location.href = "./dashboard";
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
        location.href = "./dashboard";
      } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
      }
    });
  }
}

// Call login function
login();

// * Referral System Section
// Get the parameters
const params = location.search;

// Get referral code from params
const getQueryString = new URLSearchParams(params);
const referralCode = getQueryString.get("ref");

// Get referral code from database
async function getRefCode() {
  const refDbRespond = await fetch("./assets/json/referrals.json");
  const ref = await refDbRespond.json();
  return ref;
}

// Init variable
var referral;

// Extract
getRefCode()
  .then((ref) => {
    const referral = ref;
    return referral;
  })
  .catch((error) => {
    console.error(error);
  });

// Init from extract
async function auth() {
  let referral = await getRefCode();

  // Check if the referral code is correct
  let rCode = referral.find((r) => r.referralCode === referralCode);

  if (rCode.referralCode) {
    setCookie("username", rCode.username, 3);
    location.href = "./dashboard";
  }
}
