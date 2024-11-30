document.getElementById('event-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('event-name').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const location = document.getElementById('event-location').value;

    if (name && date && time && location) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push({ name, date, time, location });
        localStorage.setItem('events', JSON.stringify(events));

        document.getElementById('event-form').reset();
        alert('Event added successfully!');
    }
});

document.getElementById('view-events').addEventListener('click', function () {
    window.location.href = 'events.html';
});
