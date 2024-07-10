document.addEventListener('DOMContentLoaded', function() {
    const habitForm = document.getElementById('habit-form');
    const habitInput = document.getElementById('habit-input');
    const habitList = document.getElementById('habit-list');

    function loadHabits() {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.forEach(habit => {
            addHabitToList(habit);
        });
    }

    function saveHabit(habit) {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.push(habit);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    // Update a habit in local storage
    function updateHabitInStorage(updatedHabit) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits = habits.map(habit => habit.text === updatedHabit.text ? updatedHabit : habit);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

     // Delete a habit from local storage
     function deleteHabitFromStorage(habitText) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits = habits.filter(habit => habit.text !== habitText);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    // Add a habit to the list in the DOM
    function addHabitToList(habit) {
        const li = document.createElement('li');
        li.textContent = habit.text;
        if (habit.completed) {
            li.classList.add('completed');
        }

        // Toggle completed status on click
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            habit.completed = !habit.completed;
            updateHabitInStorage(habit);
        });

        // Create a delete button for each habit
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation();  // Prevent the click event from toggling completed status
            habitList.removeChild(li);
            deleteHabitFromStorage(habit.text);
        });

        li.appendChild(deleteButton);
        habitList.appendChild(li);
    }

    // Handle form submission to add a new habit
    habitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const habitText = habitInput.value.trim();
        if (habitText === '') {
            alert('Please enter a habit');
            return;
        }

        const habit = { text: habitText, completed: false };
        addHabitToList(habit);
        saveHabit(habit);
        habitInput.value = '';
    });

    loadHabits();
});