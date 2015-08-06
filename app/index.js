window.addEventListener('load', function init() {
    var searchButton = document.getElementById('searchButton');
    searchButton.onclick = showAlert;
});

function showAlert(e) {
    e.preventDefault();
    alert("onclick Event detected!");
}

