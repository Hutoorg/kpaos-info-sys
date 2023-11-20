const loginForm = document.getElementById("login-form");
const welcomeMessage = document.getElementById("welcome-message");

const users = [
  { username: "nadech.ta", password: "01527" },
  { username: "apiwit.po", password: "01528" },
  { username: "atitaya.bo", password: "01521" },
  { username: "peamika.ao", password: "01529" },
  { username: "narawit.na", password: "01536" },
  { username: "lanta.pu", password: "01533" },
  { username: "rittinan.so", password: "01525" },
];

let user = localStorage.getItem("username");

if (user) {
  location.href = "/home.html";
} else {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    let user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      localStorage.setItem("username", username);
      location.href = "/home.html";
    } else {
      alert("Invalid username or password!");
    }
  });
}
