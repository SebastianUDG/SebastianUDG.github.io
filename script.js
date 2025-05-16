document.addEventListener("DOMContentLoaded", loadUsers);
document.getElementById("userForm").addEventListener("submit", saveUser);

function loadUsers() {
  fetch("api.php")
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("userTable");
      table.innerHTML = "";
      data.forEach(user => {
        table.innerHTML += `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
              <button onclick="editUser(${user.id})">Editar</button>
              <button onclick="deleteUser(${user.id})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
}

function saveUser(e) {
  e.preventDefault();
  const id = document.getElementById("userId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  fetch("api.php", {
    method: "POST",
    body: JSON.stringify({ id, name, email })
  }).then(() => {
    document.getElementById("userForm").reset();
    loadUsers();
  });
}

function editUser(id) {
  fetch(`api.php?id=${id}`)
    .then(res => res.json())
    .then(user => {
      document.getElementById("userId").value = user.id;
      document.getElementById("name").value = user.name;
      document.getElementById("email").value = user.email;
    });
}

function deleteUser(id) {
  fetch("api.php", {
    method: "DELETE",
    body: `id=${id}`
  }).then(loadUsers);
}
table.innerHTML += `
  <tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>
      <button class="btn green" onclick="editUser(${user.id})">Editar</button>
      <button class="btn red" onclick="deleteUser(${user.id})">Eliminar</button>
    </td>
  </tr>
`;
