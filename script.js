let tasks = [];
let contacts = [];
let timer = null;

// 🔧 baza cen
const prices = {
  "silnika": 1500,
  "uszcz": 1500,
  "hamul": 400,
  "sprzęgła": 700,
  "wymiana sprzęgła": 3000,
  "lakier": 1000,
  "elektry": 200,
  "szyb": 1000
};

// 🔍 wyszukiwanie ceny po opisie
function detectPrice(problem) {
  problem = problem.toLowerCase();

  for (let key in prices) {
    if (problem.includes(key)) {
      return prices[key];
    }
  }
  return null;
}

// ✅ dodawanie zgłoszenia
function addTask() {
  let name = document.getElementById("name").value;
  let car = document.getElementById("car").value;
  let problem = document.getElementById("problem").value;

  let price = detectPrice(problem);

  // ❌ brak dopasowania → konsultacja
  if (!price) {
    alert("Nie znaleziono usługi. Proszę zadzwonić: 333444555");

    contacts.push({
      name: name,
      phone: "333444555",
      time: Date.now()
    });

    renderContacts();
    return;
  }

  // ✅ normalne zgłoszenie
  let task = {
    name,
    car,
    status: "Oczekiwanie"
  };

  tasks.push(task);
  render();

  showMessage(problem, price, tasks.length - 1);
}

// 📢 komunikat
function showMessage(problem, price, index) {
  const msg = document.getElementById("message");

  msg.style.display = "block";
  msg.innerHTML = `
    🔧 ${problem} - ${price} zł <br><br>
    <button onclick="accept(${index})">Akceptuj</button>
    <button onclick="cancel(${index})">Anuluj</button>
  `;

  clearTimeout(timer);
  timer = setTimeout(() => {
    resetAll();
  }, 180000); // 3 min
}

// ✅ akceptacja
function accept(index) {
  tasks[index].status = "W trakcie naprawy";
  document.getElementById("message").style.display = "none";

  render();

  // symulacja zakończenia naprawy
  setTimeout(() => {
    tasks[index].status = "Naprawiono! Proszę przygotować płatność";
    render();
  }, 10000);
}

// ❌ anulowanie
function cancel(index) {
  tasks.splice(index, 1);
  document.getElementById("message").style.display = "none";
  render();
}

// 🔄 reset wszystkiego (po 3 minutach)
function resetAll() {
  tasks = [];
  contacts = [];
  document.getElementById("message").style.display = "none";
  render();
}

// 📋 tabela napraw
function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach(t => {
    let row = `
      <tr>
        <td>${t.name}</td>
        <td>${t.car}</td>
        <td>${t.status}</td>
      </tr>
    `;

    list.innerHTML += row;
  });

  renderContacts(); // 🔥 ważne!
}

// tabela konsuktacji (3 minuty)
function renderContacts() {
  let list = document.getElementById("contactList");
  list.innerHTML = "";

  let now = Date.now();

  // filtr 3 minut
  contacts = contacts.filter(c => now - c.time < 180000);

  contacts.forEach(c => {
    let row = `
      <tr>
        <td>${c.name}</td>
        <td>${c.phone}</td>
        <td>Proszę zadzwonić - konsultacja</td>
      </tr>
    `;

    list.innerHTML += row;
  });
}
