const themeCheckbox = document.getElementById('theme');
const body = document.body;
const filterOptions = document.querySelectorAll('.filter input[name="filter"]');
const clearCompletedButton = document.querySelector('.clear');
const itemsLeftElement = document.querySelector('.items-left span');
const todoList = document.querySelector('.todo-list ul');
var removeButtons = document.querySelectorAll('.remove');




themeCheckbox.addEventListener('change', () => {
  body.classList.toggle('light-theme', themeCheckbox.checked);
});



document.addEventListener("DOMContentLoaded", function () {




    // Get the theme switch checkbox
    var themeSwitch = document.getElementById('theme');

    // Set the initial theme based on local storage
    setThemeFromLocalStorage();
  
    // Add a change event listener to the theme switch
    themeSwitch.addEventListener('change', function() {
      // Toggle the theme
      toggleTheme();
  
      // Save the theme to local storage
      saveThemeToLocalStorage();
    });
  
// Function to toggle the theme
function toggleTheme() {
  // Toggle the 'light-theme' class based on the state of the checkbox
  document.body.classList.toggle('light-theme', themeSwitch.checked);
  
  // Save the theme to local storage
  saveThemeToLocalStorage();
}


// Function to set the theme based on local storage
function setThemeFromLocalStorage() {
  var savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light-theme') {
    document.body.classList.add('light-theme');
    // If the light theme is saved, check the theme switch checkbox
    themeSwitch.checked = true;
  } else {
    document.body.classList.remove('light-theme');
    // If the dark theme is saved, uncheck the theme switch checkbox
    themeSwitch.checked = false;
  }
}



    // Function to save the theme to local storage
    function saveThemeToLocalStorage() {
      var currentTheme = document.body.classList.contains('light-theme') ? 'light-theme' : '';
      localStorage.setItem('theme', currentTheme);
    }

    // Get the input element
    const addItemInput = document.getElementById('addItem');
  
    // Add event listener for the "keyup" event on the input
    addItemInput.addEventListener('keyup', function (event) {
      // Check if the key pressed is Enter (key code 13)
      if (event.key === 'Enter') {
        // Call the function to add a new todo item
        addTodoItem();
      }
    });
  


 
    
  
    // Delegate the change event to the todo list for any checkbox inside it
    todoList.addEventListener('click', function (event) {

      const checkbox = event.target.closest('input[type="checkbox"]');
  
      if (checkbox && checkbox.name === 'todoItem') {
        // Checkbox was clicked, update the items left count
        updateItemsLeftCount();
    
        // Save the updated todo list to local storage
        saveTodoListToLocalStorage();
      }

      if (event.target.classList.contains('remove')) {
        // Find the parent 'li' element and remove it
        var listItem = event.target.closest('li');
        listItem.remove();

    
        // Save the updated todo list to local storage
        saveTodoListToLocalStorage();

        // Update the items left count
        updateItemsLeftCount();
      }
    });
  

  
    // Update the items left count initially
    updateItemsLeftCount();
  
    // Function to update the items left count
    function updateItemsLeftCount() {
      // Get the number of unchecked checkboxes
      const uncheckedCheckboxes = document.querySelectorAll('input[name="todoItem"]:not(:checked)');
  
      // Update the items left count in the DOM
      itemsLeftElement.textContent = uncheckedCheckboxes.length;
    }

    document.querySelector('.todo-list ul').addEventListener('change', function (event) {
      if (event.target.type === 'checkbox' && event.target.name === 'todoItem') {
        // Update the items left count when a checkbox is changed
        updateItemsLeftCount();

        saveThemeToLocalStorage();
      }
    });

    
  
    // Function to add a new todo item
    function addTodoItem() {
      // Get the value from the input field
      const newItemText = addItemInput.value.trim();
  
      // Check if the input is not empty
      if (newItemText !== '') {
        // Create a new list item
        const newListItem = document.createElement('li');
        newListItem.classList.add('flex-row');
  
        // Create the label element with the checkbox and text
        const label = document.createElement('label');
        label.classList.add('list-item');
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'todoItem';
  
        const checkmark = document.createElement('span');
        checkmark.classList.add('checkmark');
  
        const text = document.createElement('span');
        text.classList.add('text');
        text.textContent = newItemText;
  
        // Append checkbox, checkmark, and text to the label
        label.appendChild(checkbox);
        label.appendChild(checkmark);
        label.appendChild(text);
  
        // Create the remove span
        const removeSpan = document.createElement('span');
        removeSpan.classList.add('remove');
  
        // Append label and removeSpan to the new list item
        newListItem.appendChild(label);
        newListItem.appendChild(removeSpan);
  
        // Append the new list item to the todo list

        todoList.appendChild(newListItem);

  
        // Clear the input field
        addItemInput.value = '';


  
        // Update the items left count
        updateItemsLeftCount();


        // Save the updated todo list to local storage
        saveTodoListToLocalStorage();

        console.log("adding a value");

      }
    }

// Function to add a new todo item
function addTodoItemFromLocalStorage(text, checked) {
  // Create a new list item
  const newListItem = document.createElement('li');
  newListItem.classList.add('flex-row');

  // Create the label element with the checkbox and text
  const label = document.createElement('label');
  label.classList.add('list-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'todoItem';
  checkbox.checked = checked; // Set the initial checked state

  const checkmark = document.createElement('span');
  checkmark.classList.add('checkmark');

  const textElement = document.createElement('span');
  textElement.classList.add('text');
  textElement.textContent = text;

  // Append checkbox, checkmark, and text to the label
  label.appendChild(checkbox);
  label.appendChild(checkmark);
  label.appendChild(textElement);

  // Create the remove span
  const removeSpan = document.createElement('span');
  removeSpan.classList.add('remove');

  // Append label and removeSpan to the new list item
  newListItem.appendChild(label);
  newListItem.appendChild(removeSpan);

  // Append the new list item to the todo list
  todoList.appendChild(newListItem);

  // Update the items left count
  updateItemsLeftCount();
}


// Function to load the todo list from local storage
function loadTodoListFromLocalStorage() {
  var savedTodoList = JSON.parse(localStorage.getItem('todoList')) || [];


  // Clear the existing todo list
  todoList.innerHTML = '';

  savedTodoList.forEach(function (todoItem) {
    addTodoItemFromLocalStorage(todoItem.text, todoItem.checked);
  });

}


  // Add event listener for each filter option
  filterOptions.forEach(function (filterOption) {
    filterOption.addEventListener('change', function () {
      // Call the function to filter the todo items based on the selected option
      filterTodoItems(filterOption.id);

            // Save the updated todo list to local storage
            saveTodoListToLocalStorage();
    });
  });

  // Add event listener for the "click" event on the clear button
  clearCompletedButton.addEventListener('click', function () {
    // Call the function to clear completed todo items
    clearCompletedTodoItems();

    saveTodoListToLocalStorage();

  });

  // Function to filter todo items based on the selected option
  function filterTodoItems(option) {
    const todoItems = document.querySelectorAll('.todo-list li');

    todoItems.forEach(function (todoItem) {
      const checkbox = todoItem.querySelector('input[name="todoItem"]');
      
      switch (option) {
        case 'all':
          todoItem.style.display = 'flex';
          break;
        case 'active':
          checkbox.checked ? todoItem.style.display = 'none' : todoItem.style.display = 'flex';
          break;
        case 'completed':
          checkbox.checked ? todoItem.style.display = 'flex' : todoItem.style.display = 'none';
          break;
      }
    });
  }

        

        // Add a click event listener to each 'remove' button
  removeButtons.forEach(function(button) {
          button.addEventListener('click', function() {
            // Find the parent 'li' element and remove it
            var listItem = button.closest('li');
            listItem.remove();
  
            // Update the items left count
            updateItemsLeftCount();
          });
        });

  // Function to clear completed todo items
  function clearCompletedTodoItems() {
    const completedItems = document.querySelectorAll('.todo-list li input[name="todoItem"]:checked');

    completedItems.forEach(function (completedItem) {
      // Remove the parent li element (todo item) from the DOM
      completedItem.closest('li').remove();
    });

    // Update the items left count
    updateItemsLeftCount();
  }

  
  loadTodoListFromLocalStorage()



  // Function to save the todo list to local storage
  function saveTodoListToLocalStorage() {
    var todoItems = document.querySelectorAll('.todo-list li');
    var todoListArray = [];

    todoItems.forEach(function (todoItem) {
      var checkbox = todoItem.querySelector('input[name="todoItem"]');
      var text = todoItem.querySelector('.text').textContent;
      var checked = checkbox.checked;

      todoListArray.push({ text: text, checked: checked });
    });

    localStorage.setItem('todoList', JSON.stringify(todoListArray));
  }

});
  