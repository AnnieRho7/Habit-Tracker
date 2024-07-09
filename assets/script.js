document.addEventListener('DOMContentLoaded', function() {
    const habitList = document.getElementById('habit-list');

    function loadHabits() {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.forEach(habit => {
            addHabitToList(habit);
        });
    }

    function addHabitToList(habit) {
        const li = document.createElement('li');
        li.textContent = habit.text;
        if (habit.completed) {
            li.classList.add('completed');
        }

        habitList.appendChild(li);
    }

    loadHabits();
});