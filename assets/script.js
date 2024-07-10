document.addEventListener('DOMContentLoaded', function() {
    const habitForm = document.getElementById('habit-form');
    const habitInput = document.getElementById('habit-input');
    const habitList = document.getElementById('habit-list');
    const completedList = document.getElementById('completed-list');

    function loadHabits() {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.forEach(habit => {
            if (habit.completed) {
                addHabitToCompletedList(habit);
            } else {
                addHabitToList(habit);
            }
        });
    }

    function saveHabit(habit) {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.push(habit);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function updateHabitInStorage(updatedHabit) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits = habits.map(habit => habit.text === updatedHabit.text ? updatedHabit : habit);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function deleteHabitFromStorage(habitText) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits = habits.filter(habit => habit.text !== habitText);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function addHabitToList(habit) {
        const li = document.createElement('li');
        li.textContent = habit.text;

        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            habit.completed = !habit.completed;
            updateHabitInStorage(habit);
            if (habit.completed) {
                habitList.removeChild(li);
                addHabitToCompletedList(habit);
            } else {
                completedList.removeChild(li);
                addHabitToList(habit);
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation();
            habitList.removeChild(li);
            deleteHabitFromStorage(habit.text);
        });

        li.appendChild(deleteButton);
        habitList.appendChild(li);
    }

    function addHabitToCompletedList(habit) {
        const li = document.createElement('li');
        li.textContent = habit.text;
        li.classList.add('completed');

        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            habit.completed = !habit.completed;
            updateHabitInStorage(habit);
            if (habit.completed) {
                completedList.removeChild(li);
                addHabitToCompletedList(habit);
            } else {
                habitList.removeChild(li);
                addHabitToList(habit);
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation();
            completedList.removeChild(li);
            deleteHabitFromStorage(habit.text);
        });

        li.appendChild(deleteButton);
        completedList.appendChild(li);
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