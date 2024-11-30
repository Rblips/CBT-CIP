// Redirect to login page if not logged in
if (!localStorage.getItem('username')) {
  window.location.href = 'login.html';
}

// Display logged-in username
const usernameDisplay = document.getElementById('username');
const loggedInUsername = localStorage.getItem('username');
usernameDisplay.textContent = loggedInUsername;

// Logout functionality
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('username');
  window.location.href = 'login.html';
});

// BlogSphere functionality
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Save posts to localStorage
const savePosts = () => localStorage.setItem('posts', JSON.stringify(posts));

// Render posts
const postsContainer = document.getElementById('posts-container');
const renderPosts = () => {
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => createPostElement(post, index));
};

// Create a new post element
const createPostElement = (post, index) => {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  postDiv.innerHTML = `
    <p><strong>${post.author}</strong>: ${post.content}</p>
    <textarea class="comment-box" placeholder="Write a comment..."></textarea>
    <button class="comment-btn">Add Comment</button>
    <div class="comments-container">
      ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
    </div>
  `;

  const commentBox = postDiv.querySelector('.comment-box');
  const commentButton = postDiv.querySelector('.comment-btn');
  const commentsContainer = postDiv.querySelector('.comments-container');

  commentButton.addEventListener('click', () => {
    const comment = commentBox.value.trim();
    if (comment) {
      posts[index].comments.push(comment);
      savePosts();
      const commentElement = document.createElement('p');
      commentElement.textContent = comment;
      commentsContainer.appendChild(commentElement);
      commentBox.value = '';
    }
  });

  postsContainer.appendChild(postDiv);
};

// Add new post
const postContent = document.getElementById('post-content');
const submitPost = document.getElementById('submit-post');

submitPost.addEventListener('click', () => {
  const content = postContent.value.trim();
  if (content) {
    const newPost = {
      author: loggedInUsername,
      content,
      comments: [],
    };
    posts.unshift(newPost);
    savePosts();
    renderPosts();
    postContent.value = '';
  } else {
    alert('Post content cannot be empty!');
  }
});

// Search functionality
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  const filteredPosts = posts.filter(
    post =>
      post.content.toLowerCase().includes(query) ||
      post.comments.some(comment => comment.toLowerCase().includes(query))
  );

  postsContainer.innerHTML = '';
  filteredPosts.forEach(createPostElement);
});

// Initial render
renderPosts();
