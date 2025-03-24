const API_URL = "http://localhost:3000/students";

// Fetch students and display them
async function fetchStudents() {
  const response = await fetch(API_URL);
  const students = await response.json();

  const table = document.getElementById("studentTable");
  table.innerHTML = "";

  students.forEach((student) => {
    table.innerHTML += `
            <tr>
                <td>${student._id}</td>
                <td>${student.name.toUpperCase()}</td>
                <td>${student.age}</td>
                <td>${student.email}</td>
                <td>
                    <button onclick="editStudent('${student._id}', '${
      student.name
    }', '${student.age}', '${student.email}')">Edit</button>
                    <button onclick="deleteStudent('${
                      student._id
                    }')">Delete</button>
                </td>
            </tr>
        `;
  });
}

// Add or Update Student
async function addOrUpdateStudent() {
  const studentId = document.getElementById("studentId").value;

  const name = document.getElementById("name").value.toUpperCase(); // Convert to uppercase
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;

  const studentData = { name, age, email };

  if (studentId) {
    // Update existing student
    await fetch(`${API_URL}/${studentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });
  } else {
    // Create new student
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });
  }

  clearForm();
  fetchStudents();
}

// Edit student details
function editStudent(id, name, age, email) {
  document.getElementById("studentId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("age").value = age;
  document.getElementById("email").value = email;
}

// Delete student
async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchStudents();
}

// Clear input fields
function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";
}

// Initial fetch
fetchStudents();
