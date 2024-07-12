document.addEventListener("DOMContentLoaded", function () {
    const habitForm = document.getElementById("habit-form");
    const habitInput = document.getElementById("habit-input");
    const habitList = document.getElementById("habit-list");
    const progressBars = document.getElementById("progress-bars");
  
    // Load habits from local storage and render them
    function loadHabits() {
      const habits = JSON.parse(localStorage.getItem("habits")) || [];
      habits.forEach((habit) => addHabitToTable(habit));
      updateProgressBars(); // Update progress bars
    }
  
    // Save a new habit to local storage
    function saveHabit(habit) {
      const habits = JSON.parse(localStorage.getItem("habits")) || [];
      habits.push(habit);
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  
    // Update habit in local storage
    function updateHabitInStorage(updatedHabit) {
      let habits = JSON.parse(localStorage.getItem("habits")) || [];
      habits = habits.map((habit) =>
        habit.text === updatedHabit.text ? updatedHabit : habit,
      );
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  
    // Delete habit from local storage
    function deleteHabitFromStorage(habitText) {
      let habits = JSON.parse(localStorage.getItem("habits")) || [];
      habits = habits.filter((habit) => habit.text !== habitText);
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  
    // Add a habit to the table
    function addHabitToTable(habit) {
      const tr = document.createElement("tr");
  
      const tdHabit = document.createElement("td");
      tdHabit.textContent = habit.text;
      tr.appendChild(tdHabit);
  
      // Create table cells for each day
      const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      days.forEach((day) => {
        const td = document.createElement("td");
        td.classList.add("day");
        td.dataset.day = day;
        td.textContent = habit[day] ? "✔️" : "";
        td.addEventListener("click", () => {
          habit[day] = !habit[day];
          td.textContent = habit[day] ? "✔️" : "";
          updateHabitInStorage(habit);
          updateProgressBars(); // Update progress bars when a habit is marked
        });
        tr.appendChild(td);
      });
  
      // Add delete button for each habit
      const tdDelete = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function (event) {
          event.stopPropagation();
          const confirmation = confirm("Are you sure you want to delete?");
          if (confirmation) {
              habitList.removeChild(tr);
              deleteHabitFromStorage(habit.text);
              updateProgressBars(); // Update progress bars when a habit is deleted
          }
      });
      tdDelete.appendChild(deleteButton);
      tr.appendChild(tdDelete);

      habitList.appendChild(tr);
  }
  
    // Update the progress bars to reflect habit completion
    function updateProgressBars() {
      const habits = JSON.parse(localStorage.getItem("habits")) || [];
      progressBars.innerHTML = "";
      habits.forEach((habit) => {
        const totalDays = 7;
        const completedDays = [
          "mon",
          "tue",
          "wed",
          "thu",
          "fri",
          "sat",
          "sun",
        ].reduce((acc, day) => acc + (habit[day] ? 1 : 0), 0);
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        const progress = document.createElement("div");
        progress.classList.add("progress");
        progress.style.width = `${(completedDays / totalDays) * 100}%`;
        progressBar.textContent = `${habit.text}: ${completedDays}/${totalDays}`;
        progressBar.appendChild(progress);
        progressBars.appendChild(progressBar);
      });
    }
  
    // Add new habit
    habitForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const habitText = habitInput.value.trim();
      if (habitText === "") {
        alert("Please enter a habit");
        return;
      }
  
      const habit = {
        text: habitText,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      };
      addHabitToTable(habit);
      saveHabit(habit);
      habitInput.value = "";
    });
  
    loadHabits();
  });
  