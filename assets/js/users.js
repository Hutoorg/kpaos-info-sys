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
// ! Do NOT edit this section!
const users = [
  { username: "nadech.ta", name: "ณดชน์ ตั้งปภานันต์" },
  { username: "kpaos", name: "ผู้ใช้ รร.อบจ.กระบี่" },
];

let user = users.find((u) => u.username === username);

if (user) {
  // Check if 'user' is defined
  document.getElementById("hello").innerHTML =
    "สวัสดี " + user.name + " ยินดีต้อนรับสู่ ระบบข้อมูล รร.อบจ.กระบี่";
} else {
  location.href = "./";
}

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
