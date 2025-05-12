// Backend API Integration with JSONPlaceholder
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Helper function to show/hide loading state
function setLoadingState(isLoading) {
    const loading = document.getElementById('apiLoading');
    loading.style.display = isLoading ? 'block' : 'none';
}

// Helper function to show error messages
function showError(message) {
    const errorDiv = document.getElementById('apiError');
    errorDiv.style.display = 'block';
    errorDiv.textContent = `Error: ${message}`;
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Helper function to show API results
function showResult(message) {
    const resultDiv = document.getElementById('apiResult');
    resultDiv.style.display = 'block';
    resultDiv.textContent = message;
}

// Helper function to render TODOs list
function renderTodos(todos) {
    const todosList = document.getElementById('todosList');
    todosList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <div class="todo-id">ID: ${todo.id}</div>
            <div class="todo-title">${todo.title}</div>
            <div class="todo-status ${todo.completed ? 'completed' : 'pending'}">
                Status: ${todo.completed ? 'Completed' : 'Pending'}
            </div>
        `;
        todosList.appendChild(li);
    });
}

// Fetch all TODOs
document.getElementById('fetchTodosBtn').addEventListener('click', async function() {
    setLoadingState(true);
    try {
        const response = await fetch(`${API_BASE_URL}/todos`);
        if (!response.ok) {
            throw new Error('Failed to fetch TODOs');
        }
        const todos = await response.json();
        renderTodos(todos.slice(0, 10)); // Display only first 10 for better UI
        showResult(`Successfully fetched ${todos.length} TODOs (showing first 10)`);
    } catch (error) {
        showError(error.message);
    } finally {
        setLoadingState(false);
    }
});

// Fetch specific TODO by ID
document.getElementById('fetchSpecificTodoBtn').addEventListener('click', async function() {
    const todoId = document.getElementById('todoIdInput').value;
    if (!todoId) {
        showError('Please enter a TODO ID');
        return;
    }
    
    setLoadingState(true);
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${todoId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch TODO');
        }
        const todo = await response.json();
        renderTodos([todo]);
        showResult(`Successfully fetched TODO with ID: ${todoId}`);
    } catch (error) {
        showError(error.message);
    } finally {
        setLoadingState(false);
    }
});

// Create new TODO
document.getElementById('createTodoBtn').addEventListener('click', async function() {
    const title = document.getElementById('todoTitleInput').value;
    const completed = document.getElementById('todoCompletedInput').value === 'true';
    
    if (!title) {
        showError('Please enter a TODO title');
        return;
    }
    
    setLoadingState(true);
    try {
        const response = await fetch(`${API_BASE_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                completed: completed,
                userId: 1
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to create TODO');
        }
        
        const newTodo = await response.json();
        showResult(`Successfully created TODO with ID: ${newTodo.id}`);
        // Clear existing todos and show new one
        renderTodos([newTodo]);
    } catch (error) {
        showError(error.message);
    } finally {
        setLoadingState(false);
    }
});

// Update TODO
document.getElementById('updateTodoBtn').addEventListener('click', async function() {
    const todoId = document.getElementById('todoIdInput').value;
    const title = document.getElementById('todoTitleInput').value;
    const completed = document.getElementById('todoCompletedInput').value === 'true';
    
    if (!todoId) {
        showError('Please enter a TODO ID');
        return;
    }
    
    setLoadingState(true);
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: parseInt(todoId),
                title: title || `Updated TODO ${todoId}`,
                completed: completed,
                userId: 1
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update TODO');
        }
        
        const updatedTodo = await response.json();
        showResult(`Successfully updated TODO with ID: ${todoId}`);
        renderTodos([updatedTodo]);
    } catch (error) {
        showError(error.message);
    } finally {
        setLoadingState(false);
    }
});

// Delete TODO
document.getElementById('deleteTodoBtn').addEventListener('click', async function() {
    const todoId = document.getElementById('todoIdInput').value;
    
    if (!todoId) {
        showError('Please enter a TODO ID');
        return;
    }
    
    setLoadingState(true);
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete TODO');
        }
        
        showResult(`Successfully deleted TODO with ID: ${todoId}`);
        // Clear the list
        document.getElementById('todosList').innerHTML = '';
    } catch (error) {
        showError(error.message);
    } finally {
        setLoadingState(false);
    }
});

// Clear all TODOs from display
document.getElementById('clearTodosBtn').addEventListener('click', function() {
    document.getElementById('todosList').innerHTML = '';
    showResult('Cleared all TODOs from display');
});