let tasks = [];
let timer = null;

// ceny usterek
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

  if (!price) {
    alert("Nie znaleziono ceny!");
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
  });
}
