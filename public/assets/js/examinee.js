// Examinee data
const examinees = [
  {
    no: "",
    sits_id: "",
    reg_id: "",
    prefix: "",
    name: "",
    exam_room: "",
    building: "",
    floor: "",
    room_id: "",
  },
  {
    no: 1,
    sits_id: 1,
    reg_id: "100001",
    prefix: "ด.ช.",
    name: "ทดสอบ ทดสอบ",
    exam_room: 1,
    building: "จันอิน",
    floor: 2,
    room_id: 3201,
  },
  {
    no: 2,
    sits_id: 2,
    reg_id: "100002",
    prefix: "ด.ญ.",
    name: "ทดสอบ ทดสอบ",
    exam_room: 1,
    building: "จันอิน",
    floor: 2,
    room_id: 3201,
  },
];

// Form submit event
document.getElementById("exeeInput").addEventListener("submit", (event) => {
  event.preventDefault();

  // Get register ID from input
  let registerId = document.getElementById("exeeID").value;

  // Check if the register ID from the input exists in the examinees database
  let examinee = examinees.find((e) => e.reg_id === registerId);

  if (examinee) {
    document.getElementById("no").innerHTML = "ที่: " + examinee.no;
    document.getElementById("sits").innerHTML =
      "เลขที่นั่งสอบ: " + examinee.sits_id;
    document.getElementById("reg").innerHTML =
      "รหัสประจำตัวสอบ: " + examinee.reg_id;
    document.getElementById("exeeName").innerHTML =
      "ชื่อ-สกุล: " + examinee.prefix + " " + examinee.name;

    document.getElementById("exRoom").innerHTML =
      "ห้องสอบที่: " + examinee.exam_room;
    document.getElementById("building").innerHTML =
      "อาคาร: " + examinee.building;
    document.getElementById("floor").innerHTML = "ชั้น: " + examinee.floor;
    document.getElementById("roomID").innerHTML = "ห้อง: " + examinee.room_id;
  } else {
    alert("ไม่พบข้อมูลผู้เข้าสอบ!");
  }
});
