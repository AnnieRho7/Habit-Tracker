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

    function addHabitToList(habit) {
        const li = document.createElement('li');
        li.textContent = habit.text;
        if (habit.completed) {
            li.classList.add('completed');
        }

        habitList.appendChild(li);
    }

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