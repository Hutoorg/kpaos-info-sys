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
let user = document.cookie;
getCookie("username");

//* User Section
// ! Do NOT edit this section!
const users = [
  { username: "nadech.ta", name: "ณดชน์ ตั้งปภานันต์" },
  { username: "kpaos", name: "ผู้ใช้" },
];

if (user == users) {
  document.getElementById("hello").innerHTML =
    "สวัสดี " + user + " ยินดีต้อนรับสู่ ระบบข้อมูล รร.อบจ.กระบี่";
}

// TODO: Finish this code
