// Get Examinees
async function getExaminee() {
  const examineeDbResponse = await fetch("./assets/data/examinee.json");
  const exees = await examineeDbResponse.json();
  return exees;
}

// Init variable
var examinees;

// Extract
getExaminee()
  .then((exees) => {
    const examinees = exees;
    return examinees;
  })
  .catch((error) => {
    console.error(error);
  });

// Init from extract
async function examinee() {
  let examinees = await getExaminee();

  document.getElementById("exeeInput").addEventListener("submit", (event) => {
    event.preventDefault();

    // HTML Result function
    function results(id, key, value) {
      document.getElementById(id).innerHTML = key + ": " + value;
    }

    // Get register ID from input
    let registerId = document.getElementById("exeeID").value;

    // Check if the register ID from the input exists in the examinees database
    let examinee = examinees.find((e) => e.reg_id === registerId);

    if (examinee) {
      results("no", "ที่", examinee.no);
      results("sits", "เลขที่นั่งสอบ", examinee.sits_id);
      results("reg", "รหัสประจำตัวสอบ", examinee.reg_id);
      results("name", "ชื่อ-สกุล", examinee.prefix + " " + examinee.name);

      results("exRoom", "ห้องสอบที่", examinee.no);
      results("building", "อาคาร", examinee.no);
      results("floor", "ชั้น", examinee.no);
      results("roomID", "ห้อง", examinee.no);
    }
  });
}

examinee();
