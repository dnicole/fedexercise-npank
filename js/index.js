function init() {
    console.log('loaded');
    var searchButton = document.getElementById('search');
    searchButton.onclick = showAlert;
};

function showAlert(e) {
    e.preventDefault();
    alert("onclick Event detected!");
}

init();
