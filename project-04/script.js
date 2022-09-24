// All DOM Elements
const form = document.getElementById('form');
const formHeading = document.getElementById('form-heading');
const taskInput = document.getElementById('task-input');
const allTasksList = document.getElementById('all-tasks-list');

// All Required Variables
let allTasks = ['this is task 1.', 'this is task 2.', 'this is task 3.'];
let currentSelectedTask = null;
let sourceItem = null; // item index
let targetItem = null; // item index

// All Functions
// 1 - Function to submit form
const submitForm = e => {
    const text = taskInput.value.trim();
    if(text === ''){
        alert('Please provide some description.')
        return;
    }
    e.preventDefault();
    switch (form.className) {
        case 'add':
            // add statement
            addTask(text);
            break;
        case 'update':
            // update statement
            allTasks[currentSelectedTask] = taskInput.value.trim();
            form.className = 'add';
            formHeading.innerHTML = 'Add your form'
            break;
    };
    taskInput.value = '';
    updateDOM();
};

// 2 - Function to add task
const addTask = (text) => {
    allTasks.push(text);
}

// 3 - Function to update DOM
const updateDOM = () => {
    if(allTasks.length == 0) {
        allTasksList.innerHTML = `<p>No task todo.</p>`;
        return;
    }

    allTasksList.innerHTML = allTasks.map((text, index) => {
        return `
            <li class="task-item" data-index="${index}" draggable="true">
                <div class="details">
                    <p>${text}</p>
                    <div class="controls">
                        <button class="btn item-update-btn" data-index="${index}">Update</button>
                        <button class="btn item-delete-btn" data-index="${index}">Delete</button>
                    </div>
                </div>
                <i class="fa-solid fa-grip-lines"></i>
            </li>
        `
    }).join('');

    // Add event listener on item update buttons
    const allUpdateButton = document.querySelectorAll('.item-update-btn');
    Array.from(allUpdateButton).forEach(btn => {
        btn.addEventListener('click', updateTask);
    })
    // Add event listener on item delete buttons
    const allDeleteButton = document.querySelectorAll('.item-delete-btn');
    Array.from(allDeleteButton).forEach(btn => {
        btn.addEventListener('click', deleteTask);
    })
    // Add drag and drop event listener on list items
    const allListElements = document.querySelectorAll('.task-item');
    Array.from(allListElements).forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
        item.addEventListener('dragenter', dragEnter);
        // item.addEventListener('dragover', dragOver);
        item.addEventListener('dragleave', dragLeave);
    })
}

// 4 - Function to delete task
const deleteTask = e => {
    const taskIndex = parseInt(e.target.getAttribute('data-index'));
    allTasks = allTasks.filter((task, ind) => ind !== taskIndex);
    console.log(allTasks);
    updateDOM();
}

// 5 - Function to update task
const updateTask = (e) => {
    const taskIndex = parseInt(e.target.getAttribute('data-index'));
    taskInput.value = allTasks[taskIndex];
    formHeading.innerHTML = 'Update your task';
    form.className = 'update';
    currentSelectedTask = taskIndex;
}

// 6 - Function to reset form
const resetForm = e => {
    e.preventDefault();
    form.className = 'add';
    formHeading.innerHTML = 'Add your form'
    taskInput.value = '';
}

// 7 - Function to drag start on list item
const dragStart = e => {
    console.log('Drag Start');
    sourceItem = parseInt(e.target.getAttribute('data-index'));
    targetItem = null;
}
// 8 - Function to drag enter on list item
const dragEnter = e => {
    e.preventDefault();
    console.log('Drag Enter');
    if(e.target.classList.contains('task-item')){
        e.target.className = 'task-item hovered';
        targetItem = parseInt(e.target.getAttribute('data-index'));
    }
}
// 9 - Function to drag leave on list item
const dragLeave = e => {
    e.preventDefault();
    console.log('Drag Leave');
    // console.log('LEAVE', parseInt(e.target.getAttribute('data-index')));
    if(e.target.classList.contains('task-item')){
        e.target.className = 'task-item';
        // targetItem = null;
    }
}
// 10 - Function to drag end on list item
const dragEnd = e => {
    e.preventDefault();
    console.log('Drag End');
    if(targetItem != null) {
        let temp = allTasks[sourceItem];
        allTasks[sourceItem] = allTasks[targetItem];
        allTasks[targetItem] = temp;
    }
    updateDOM();
}

// All Event Listeners
// 1 - Event Listener to Submit the form
form.addEventListener('submit', submitForm);
form.addEventListener('reset', resetForm);

// Init
updateDOM();