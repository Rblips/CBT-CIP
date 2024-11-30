// Get forms and input elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const registerUsername = document.getElementById('register-username');
const registerPassword = document.getElementById('register-password');

// Fetch users from localStorage
const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

// Login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();
  const users = getUsers();

  // Validate username and password
  const user = users.find((u) => u.username === username);

  if (user && user.password === password) {
    // Save current user in localStorage and redirect
    localStorage.setItem('username', username);
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password!');
  }
});

// Registration form submission
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = registerUsername.value.trim();
  const password = registerPassword.value.trim();
  const users = getUsers();

  // Check if username is already taken
  if (users.some((u) => u.username === username)) {
    alert('Username already taken! Please choose another one.');
    return;
  }

  // Add new user to the database
  users.push({ username, password });
  saveUsers(users);

  alert('Registration successful! You can now log in.');
  registerUsername.value = '';
  registerPassword.value = '';
});

// Redirect to index.html if already logged in
if (localStorage.getItem('username')) {
  window.location.href = 'index.html';
}
