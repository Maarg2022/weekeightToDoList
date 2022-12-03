let todoItems = [];


// This function will create a new todo object based on the
// text that was entered in the text input, and push it into
// the `todoItems` array
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  console.log(todoItems);
  renderTodo(todo);
}

// Select the form element
const form = document.querySelector('.js-form');
// Add a submit event listener
form.addEventListener('submit', event => {
  // prevent page refresh on form submission
  event.preventDefault();
  // select the text input
  const input = document.querySelector('.js-todo-input');

  // Get the value of the input and remove whitespace
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

function renderTodo(todo) {
  //selects the first element with a class of js-todo-list
  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    // add this line to clear whitespace from the list container
    // when `todoItems` is empty
    //if (todoItems.length === 0) list.innerHTML = '';
    return
  }
// uses a ternary operator to check if todo.checked is true
  const isChecked = todo.checked ? 'done': ''; //adds an emty srting
  // creating a li element
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  // set the content of the 'li' element
  node.innerHTML = ` 
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);   // Append the element to the DOM as the last child of
                        // the element referenced by the `list` variable
  }
}

function toggleDone(key) {
  // findIndex is an array method that returns the position of an element
  // in the array.
  const index = todoItems.findIndex(item => item.id === Number(key));
  // Locate the todo item in the todoItems array and set its checked
  // property to the opposite. That means, `true` will become `false` and vice
  // versa.
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
    const itemKey = event.target.parentElement.dataset.key;
  if (event.target.classList.contains('js-tick')) {

    toggleDone(itemKey);
    return
  }
    deleteTodo(itemKey);
  });

function deleteTodo(key) {
  // find the corresponding todo object in the todoItems array
  const index = todoItems.findIndex(item => item.id === Number(key));
  // Create a new object with properties of the current todo item
  // and a `deleted` property which is set to true
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  // remove the todo item from the array by filtering it out
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}



