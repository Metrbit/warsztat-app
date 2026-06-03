let tasks = [];
let contacts = [];

const prices = {
  "silnika": 1500,
  "uszcz": 1500,
  "hamul": 400,
  "sprzęgła": 700,
  "wymiana sprzęgła": 3000
};

function detectPrice(problem) {
  problem = problem.toLowerCase();
  for (let key in prices) {
    if (problem.includes(key)) {
      return prices[key];
    }
  }
  return null;
}

function addTask() {
  const name = document.getElementById("name").value;
  const car = document.getElementById("car").value;
  const problem = document.getElementById("problem").value;

  const price = detectPrice(problem);

  if (!price) {
    alert("Nie znaleziono usługi. Zadzwoń: 333444555");

    contacts.push({
      name,
      time: Date.now()
    });

    renderContacts();
    return;
  }

  tasks.push({
    name,
    car,
    status: "W trakcie"
  });

  render();

  showMessage(problem, price);
}

function showMessage(problem, price) {
  const msg = document.getElementById("message");

  msg.style.display = "block";
  msg.innerHTML = `
    ${problem} - ${price} zł 
    <br><br>
    <button onclick="accept()">Akceptuj</button>
  `;
}

function accept() {
  document.getElementById("message").style.display = "none";

  setTimeout(() => {
    if (tasks.length > 0) {
      tasks[tasks.length - 1].status = "Naprawiono ✅";
      render();
    }
  }, 5000);
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach(t => {
    list.innerHTML += `
      <tr>
        <td>${t.name}</td>
        <td>${t.car}</td>
        <td>${t.status}</td>
      </tr>
    `;
  });

  renderContacts();
}

function renderContacts() {
  const section = document.getElementById("contactSection");
  const list = document.getElementById("contactList");

  list.innerHTML = "";

  if (contacts.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";

  contacts.forEach(c => {
    list.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>333444555</td>
        <td>Proszę zadzwonić</td>
      </tr>
    `;
  });
}
