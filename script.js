let tasks = [];

function addTask() {
  let name = document.getElementById("name").value;
  let car = document.getElementById("car").value;
  let problem = document.getElementById("problem").value;

  if (!name || !car || !problem) {
    alert("Wypełnij wszystkie pola!");
    return;
  }

  let task = {
    name: name,
    car: car,
    problem: problem,
    status: "Przyjęte"
  };

  tasks.push(task);
  render();

  // czyści pola po dodaniu
  document.getElementById("name").value = "";
  document.getElementById("car").value = "";
  document.getElementById("problem").value = "";
}

function changeStatus(index) {
  const statuses = ["Przyjęte", "W trakcie", "Gotowe"];

  let currentIndex = statuses.indexOf(tasks[index].status);
  let nextIndex = (currentIndex + 1) % statuses.length;

  tasks[index].status = statuses[nextIndex];
  render();
}

function removeTask(index) {
  tasks.splice(index, 1);
  render();
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach((t, i) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <b>${t.name}</b> (${t.car})<br>
      ${t.problem}<br>
      <b>Status:</b> ${t.status}<br><br>

      <button onclick="changeStatus(${i})">Zmień status</button>
      <button onclick="removeTask(${i})">Usuń</button>
    `;

    list.appendChild(li);
  });
}
