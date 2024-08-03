document.addEventListener("DOMContentLoaded", function () {
  let employees = [];
  let employeeId = 1;

  const form = document.getElementById("form-container");
  const nameInput = document.getElementById("name");
  const professionInput = document.getElementById("profession");
  const ageInput = document.getElementById("age");
  const employeeList = document.querySelector(".addedEmployee");
  const employeeCount = employeeList.querySelector("span");

  function updateEmployeeCount() {
    employeeCount.textContent = employees.length;
  }

  function showMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.style.color = type === "error" ? "red" : "green";
    messageDiv.style.marginTop = "10px";
    form.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
  }

  function addEmployee() {
    const name = nameInput.value.trim();
    const profession = professionInput.value.trim();
    const age = ageInput.value.trim();

    if (name === "" || profession === "" || age === "") {
      showMessage(
        "Error: Please Make sure All the fields are filled before adding in an employee!",
        "error"
      );
      return;
    }

    const employee = {
      id: employeeId++,
      name,
      profession,
      age: parseInt(age, 10),
    };

    employees.push(employee);
    showMessage("Success : Employee Added!", "success");

    nameInput.value = "";
    professionInput.value = "";
    ageInput.value = "";

    renderEmployees();
    updateEmployeeCount();
  }

  function renderEmployees() {
    const employeeContainer = document.querySelector(".employee-list");
    if (employeeContainer) {
      employeeContainer.remove();
    }

    const newEmployeeContainer = document.createElement("div");
    newEmployeeContainer.className = "employee-list";
    employees.forEach((employee) => {
      const employeeDiv = document.createElement("div");
      employeeDiv.className = "employee";
      employeeDiv.textContent = `Name: ${employee.name}, Profession: ${employee.profession}, Age: ${employee.age}`;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.style.cssText = `padding: 10px; margin-left: 10px; background-color: white; color: black; border: none; border-radius: 10px; cursor: pointer;`;
      deleteButton.addEventListener("click", () => deleteEmployee(employee.id));
      employeeDiv.appendChild(deleteButton);
      newEmployeeContainer.appendChild(employeeDiv);
    });

    employeeList.appendChild(newEmployeeContainer);
  }

  function deleteEmployee(id) {
    employees = employees.filter((employee) => employee.id !== id);
    renderEmployees();
    updateEmployeeCount();
    showMessage("Employee deleted successfully!", "success");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addEmployee();
  });
});
