var users;

async function fetchData() {
  try {
    const response = await fetch("http://16.170.252.162/api/data");
    if (!response.ok) {
      throw new Error("Щось пішло по пизді");
    }
    const data = await response.json();
    users = data;
    console.log(users);
  } catch (error) {
    console.error("Серваку пізда", error);
    showPopup("Серваку пізда", error);
  }
}

fetchData();

function sendData() {
  fetch("http://16.170.252.162/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(users),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ти уїбався в забор і все поламав-");
      }
      return response.text();
    })
    .then((result) => {
      console.log("Жмих записаний", result);
    })
    .catch((error) => {
      console.error("Якась хуйня вилізла, або ти все зламав", error);
      showPopup("Якась хуйня вилізла, або ти все зламав", error);
    });
}
