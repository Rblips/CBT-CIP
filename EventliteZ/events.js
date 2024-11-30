const eventList = document.getElementById('event-list');
const events = JSON.parse(localStorage.getItem('events')) || [];

if (events.length > 0) {
    events.forEach(event => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>Name:</strong> ${event.name}</span>
            <span><strong>Date:</strong> ${event.date}</span>
            <span><strong>Time:</strong> ${event.time}</span>
            <span><strong>Location:</strong> ${event.location}</span>
        `;
        eventList.appendChild(li);
    });
} else {
    eventList.innerHTML = '<p>No events available. Add some events on the home page!</p>';
}

document.getElementById('back-home').addEventListener('click', function () {
    window.location.href = 'index.html';
});
