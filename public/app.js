document.addEventListener('DOMContentLoaded', function() {
    let app = firebase.app();
    fetch('http://localhost:5000/fir-playground-65310/us-central1/api')
        .then(console.log)
});