body {
  font-family: Arial;
  background: #0f172a;
  color: white;
  padding: 20px;
}

h1 {
  text-align: center;
}

.container {
  display: flex;
  gap: 20px;
}

.left, .right {
  flex: 1;
  background: #1e293b;
  padding: 20px;
  border-radius: 10px;
}

.left {
  max-width: 300px;
}

input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border-radius: 5px;
  border: none;
}

button {
  padding: 9px;
  background: #22c55e;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background: #16a34a;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid gray;
}

.message {
  margin-top: 20px;
  background: #facc15;
  padding: 15px;
  border-radius: 8px;
  display: none;
  color: black;
}

#contactSection {
  display: none;
}
