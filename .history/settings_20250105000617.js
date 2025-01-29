// This script handles form submission and any additional interactivity (if needed).
document.querySelectorAll('.settings-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Settings saved successfully!');
    });
});
