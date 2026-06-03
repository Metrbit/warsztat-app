let contacts = [];
let tasks = [];
let timer = null;

// ceny usterek
const prices = {
  "naprawa silnika": 1500,
  "uszczlki wymiana": 1500,
  "hamulce naprawa/wymiana": 400,
  "sprzęgła naprawa": 700,
  "wymiana sprzęgła": 3000,
  "farbowania": 1000,
  "naprawa elektryczna": 200,
  "wymiana wyby": 1000
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

function showMessage(text, price, index) {
  const msg = document.getElementById("message");
  msg.style.display = "block";

  msg.innerHTML = `
    ${text} - ${price} zł <br><br>
    <button onclick="accept(${index})">Akceptuj</button>
    <button onclick="cancel(${index})">Anuluj</button>
  `;

  clearTimeout(timer);
  timer = setTimeout(() => {
    resetAll();
  }, 180000); // 3 minuty
}

function addTask() {
  let name = document.getElementById("name").value;
  let car = document.getElementById("car").value;
  let problem = document.getElementById("problem").value;

  let price = detectPrice(problem);

  // NIE ZNALEZIONO PROBLEMU
  if (!price) {
    contacts.push({
      name: name,
      phone: "333444555",
      time: Date.now()
    });

    renderContacts();
    return;
  }

  let task = {
    name,
    car,
    status: "Oczekiwanie"
  };

  tasks.push(task);
  render();

  showMessage(problem, price, tasks.length - 1);
}
function accept(index) {
  tasks[index].status = "W trakcie naprawy";
  document.getElementById("message").style.display = "none";
  render();

  // po 10 sekundach kończy naprawę
  setTimeout(() => {
    tasks[index].status = "Naprawiono! Przygotuj płatność";
    render();
  }, 10000);
}

function cancel(index) {
  tasks.splice(index, 1);
  document.getElementById("message").style.display = "none";
  render();
}

function resetAll() {
  tasks = [];
  document.getElementById("message").style.display = "none";
  render();
}

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
    function renderContacts() {
  let list = document.getElementById("contactList");
  list.innerHTML = "";

  let now = Date.now();

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

  });
}
